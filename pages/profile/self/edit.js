import React from "react";
import Cookies from "js-cookie";
import ProfileSelf from "@page/profile-self";
import Seo from "@layout/seo";
import Layout from "@layout";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function ProfilePage({ requiredCookiesToSet }) {
  // set cookies on client
  if (requiredCookiesToSet?.tokens) {
    cookie.set("access_token", requiredCookiesToSet.tokens.access.token, {
      expires: new Date(requiredCookiesToSet.tokens.access.expiry),
    });
    cookie.set("refresh_token", requiredCookiesToSet.tokens.refresh.token, {
      expires: new Date(requiredCookiesToSet.tokens.refresh.expiry),
    });
  }

  const authUser =
    typeof Cookies.get("user") === "string"
      ? JSON.parse(decodeURI(Cookies.get("user")))
      : Cookies.get("user");

  return (
    <Layout>
      <Seo title="Edit Profile" desc="Edit Your Public Profile on Clubbie" />
      <ProfileSelf profile={authUser?.profile} editMode />
    </Layout>
  );
}

export default ProfilePage;

export const getServerSideProps = requiresPageAuth();
