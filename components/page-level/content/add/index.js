import React from "react";
import Link from "next/link";
import Posts from "@api/services/Posts";
import ContentForm from "../common/form";
import router from "next/router";
import { createPost } from "@utils/schemas/post.schema";
import styles from "./addContent.module.css";

function TeamHeader({ teamId, teamTitle }) {
  return (
    <div className={styles.addContentTeamHeader}>
      Create a post in{" "}
      <Link href={`/teams/${teamId}`}>
        <a>
          <span className={styles.addContentTeamName}>Title {teamTitle}</span>
        </a>
      </Link>
    </div>
  );
}

function ContentAdd({ user, team }) {
  const handleOnSubmit = async ({
    _media,
    _caption,
    _description,
    _sport,
    _tags,
    _relatedMediaItems,
    uploadMultiplePostMedia,
    setStatus,
    deleteChildPosts = null,
  }) => {
    const tagType = (str) => {
      const _str = str
        ?.split(" ")
        ?.map((w) => w[0]?.toUpperCase() + w?.substr(1)?.toLowerCase())
        ?.join("")
        ?.trim();
      return _str.charAt(0).toLowerCase() + _str.slice(1);
    };

    // Common Body for parent and child post
    const commonBody = {
      title: _caption?.trim(),
      description: _description?.trim() || null,
      tags: (() => {
        const _tempTags = _tags?.map((x) => {
          return {
            type: tagType(x?.text),
            value: x?.text,
          };
        });
        if (_sport) {
          _tempTags?.push({
            type: _sport.trim(),
            value: _sport.trim(),
          });
        }
        // add author name as tag
        user?.profile?.fullName &&
          _tempTags?.push({
            type: "authorName",
            value: user?.profile?.fullName,
          });
        return _tempTags || null;
      })(),
    };

    // upload files
    const parentMedia = (await uploadMultiplePostMedia([_media]))[0] || null;
    if (!parentMedia) {
      setStatus({
        loading: false,
        msg: "Error Uploading Media",
        type: "error",
      });
      return;
    }
    let relatedMedia = null;
    if (_relatedMediaItems.length >= 0) {
      relatedMedia = await uploadMultiplePostMedia(_relatedMediaItems);
      relatedMedia = relatedMedia.filter((x) => x);
      if (relatedMedia.length !== _relatedMediaItems.length) {
        setStatus({
          loading: false,
          msg: "Error Uploading Media",
          type: "error",
        });
        return;
      }
    }

    // Make Parent Post
    const parentPost = await (async () => {
      const body = {
        ...commonBody,
        media: parentMedia?.media,
        thumbnail:
          parentMedia?.contentType === "image" ? null : parentMedia?.media,
        contentType: parentMedia?.contentType,
      };
      const payload = Object.fromEntries(
        Object.entries(body).filter(([_, v]) => v != null)
      );
      const _post = await (async () => {
        if (!team?.id) {
          return await Posts.CreatePost(payload).catch((e) => undefined);
        }
        if (team?.id) {
          return await Posts.CreatePostInTeam(team?.id, payload).catch(
            (e) => undefined
          );
        }
      })();
      return _post?.data;
    })();
    if (!parentPost) {
      setStatus({
        loading: false,
        msg: "Error Creating Post",
        type: "error",
      });
      return;
    }

    // Append child posts
    const childPostsBody = (() => {
      return relatedMedia.map((item) => {
        const _body = {
          media: item?.media,
          thumbnail: item?.contentType === "image" ? null : item?.media,
          contentType: item?.contentType,
        };
        return Object.fromEntries(
          Object.entries(_body).filter(([_, v]) => v != null)
        );
      });
    })();

    if (relatedMedia && childPostsBody.length > 0) {
      const appendedPost = await Posts.AppendChildPost(parentPost?.id, {
        childPosts: childPostsBody,
      }).catch(() => undefined);
      if (!appendedPost) {
        setStatus({
          loading: false,
          msg: "Error Creating Post",
          type: "error",
        });
        return;
      }
    }
    setStatus({ loading: false, msg: "Post Created", type: "success" });

    if (!team?.id) router.push(`/?createdPost=${parentPost.id}`, "/");
    if (team?.id)
      router.push(`/teams/${team?.id}/?createdPost=${parentPost.id}`);
  };

  return (
    <>
      <TeamHeader teamId={team?.id} teamTitle={team?.title} />
      <ContentForm
        actionText="Post"
        onSubmitForm={handleOnSubmit}
        validationSchema={createPost}
      ></ContentForm>
    </>
  );
}

export default ContentAdd;
