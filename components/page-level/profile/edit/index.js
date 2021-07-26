import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Chip from "@sub/chip";
import TemplateInput from "@sub/input";
import TemplateSelect from "@sub/selectbox";
import DirectedButton from "@sub/button-directed";
import Avatar from "@sub/avatar";
import Button from "@sub/button";
import Alert from "@sub/alert";
import Seperator from "@sub/seperator";
import ConfirmDialog from "@sub/confirm-dialog";
import Files from "@api/services/Files";
import Users from "@api/services/Users";
import auth from "@utils/helpers/auth";
import playerTitles from "@utils/fixedValues/playerTitles";
import countries from "@utils/fixedValues/countries";
import styles from "./profileedit.module.css";
import useForm from "@sub/hook-form";
import useNotifications from "@sub/hook-notification";
import { editProfile } from "@utils/schemas/user.schema";
import Auth from "@api/services/Auth";
import { resetPassword as resetPasswordSchema } from "@utils/schemas/auth.schema";

function ChangePasswordForm({ showNotificationMsg, email, setQuitReset }) {
  const router = useRouter();

  const { register, handleSubmit, errors, setValue } = useForm({
    schema: resetPasswordSchema,
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({
    type: null,
    text: null,
  });

  useEffect(() => {
    setValue("email", email);
  }, [email]);

  const onSubmit = async (data) => {
    setLoading(true);

    const { email, resetPasswordCode, password } = data;

    const response = await Auth.ResetPassword({
      email,
      resetPasswordCode,
      password,
    }).catch((err) => {
      const errorMsg = (() => {
        const _msg = err?.response?.data?.message.toLowerCase();
        if (_msg?.includes("must be a valid email"))
          return "Invalid Email Address";
        if (_msg?.includes("token not found")) return "Invalid Reset Token";
        return "Error Changing Password";
      })();
      setStatusMsg({
        type: "error",
        text: errorMsg,
      });
      return null;
    });

    if (!response) {
      setLoading(false);
      return;
    }

    // show success
    setStatusMsg({
      type: null,
      text: null,
    });
    setQuitReset(true);
    setLoading(false);
    showNotificationMsg(
      "Password Reset Successfull..! You will be logged out in 10 seconds.",
      {
        variant: "success",
        displayIcon: true,
        duration: 10000,
      }
    );

    // logout the user
    await Auth.Logout({ refreshToken: auth.getRefreshToken() })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setTimeout(function () {
      auth.deleteUser();
      auth.deleteAccessToken();
      auth.deleteRefreshToken();
      router.push("/auth/login");
    }, 10000);
  };

  return (
    <>
      <h1 className={styles.changePasswordHeader}>Change Password</h1>
      <p className={styles.changePasswordDescription}>
        We have sent you an email with a 6-digit reset password code. Use that
        in the form below to change your password
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.changePasswordForm}
      >
        <TemplateInput
          type="text"
          name="email"
          placeholder="Your Email Address"
          customProps={{ ...register("email") }}
          hint={
            errors?.email && {
              type: "error",
              msg: errors?.email?.message,
              inputBorder: true,
            }
          }
          className={styles.changePasswordEmailInput}
        />
        <TemplateInput
          type="text"
          name="resetPasswordCode"
          placeholder="Reset Password Code"
          customProps={{ ...register("resetPasswordCode") }}
          hint={
            errors?.resetPasswordCode && {
              type: "error",
              msg: errors?.resetPasswordCode?.message,
              inputBorder: true,
            }
          }
          className={styles.changePasswordinputBox}
        />
        <TemplateInput
          type="password"
          name="password"
          placeholder="Your New Password"
          customProps={{ ...register("password") }}
          hint={
            errors?.password && {
              type: "error",
              msg: errors?.password?.message,
              inputBorder: true,
            }
          }
          className={styles.changePasswordinputBox}
        />
        {statusMsg?.text && (
          <span className={styles.changePasswordError}>
            <Alert
              variant={statusMsg.type}
              text={statusMsg.text}
              animateText={statusMsg?.animateText}
            />
          </span>
        )}
        <div className={styles.changeButtonActionButtons}>
          <span>
            <Button
              variant="cancel"
              type="button"
              onClick={() => setQuitReset(true)}
            >
              Cancel
            </Button>
          </span>
          <Button variant="success" type="submit" loading={loading}>
            Update
          </Button>
        </div>
      </form>
    </>
  );
}

function ProfileEdit({ profile, clubs }) {
  // TODO: edit email, delete clubs
  const router = useRouter();

  const { register, handleSubmit, errors, setValue } = useForm({
    schema: editProfile,
  });

  useEffect(() => {
    setValue("fullName", profile?.fullName || "");
    setValue("playerTitle", profile?.playerTitle || "");
    setValue("telephone", profile?.telephone || "");
    setValue("address", profile?.address || "");
    setValue("city", profile?.city || "");
    setValue("country", profile?.country || "");
    setValue("postCode", profile?.postCode || "");
    setValue("bio", profile?.bio || "");
    setValue("email", profile?.email || "");
  }, [profile]);

  const defaultImage = "/assets/person-placeholder.jpg";

  const [image, setImage] = useState(() => profile?.image || defaultImage);
  const [status, setStatus] = useState({
    loading: false,
    msg: null,
    type: null,
    animateText: false,
  });
  const [clubsToRemove, setClubsToRemove] = useState([]);

  const { showNotificationMsg, hideNotificationMsg } = useNotifications();

  const removeClub = (id) => {
    const x = new Set([...clubsToRemove, id]);
    setClubsToRemove(x);
  };
  const onImagePicked = (image) => setImage(image);
  const onSubmit = async (data) => {
    setStatus({ loading: true });

    // upload profile image if any
    const imageUploaded = await (async () => {
      if (image.src && image.file) {
        const imageForm = new FormData();
        imageForm.append("files", image.file);
        const response = await Files.UploadFile("userImg", imageForm).catch(
          () => null
        );
        if (!response) return null;
        return response?.data[0]?.s3Url;
      }
      return undefined;
    })();
    if (imageUploaded === null) {
      showNotificationMsg("Error Uploading Profile Pic", {
        variant: "error",
        displayIcon: true,
      });
      setStatus({ loading: false });
      return;
    }

    // update profile data
    const {
      fullName,
      playerTitle,
      // email,
      telephone,
      address,
      city,
      country,
      postCode,
      bio,
    } = data;
    const formBody = {
      image: imageUploaded || null,
      fullName: fullName?.length > 0 ? fullName?.trim() : fullName || null,
      playerTitle:
        playerTitle?.length > 0 ? playerTitle?.trim() : playerTitle || null,
      // email: email?.length > 0 ? email?.trim() : email || null,
      telephone: telephone?.length > 0 ? telephone?.trim() : telephone || null,
      address: address?.length > 0 ? address?.trim() : address || null,
      city: city?.length > 0 ? city?.trim() : city || null,
      country: country?.length > 0 ? country?.trim() : country || null,
      postCode: postCode?.length > 0 ? postCode?.trim() : postCode || null,
      bio: bio?.length > 0 ? bio?.trim() : bio || null,
    };
    const updateBody = Object.fromEntries(
      Object.entries(formBody).filter(([_, v]) => v != null)
    );
    const response = await Users.UpdateProfile(updateBody).catch(() => null);
    if (!response) {
      setStatus({
        loading: false,
        msg: "Error Updating Profile",
        type: "error",
      });
      showNotificationMsg("Error Updating Profile", {
        variant: "error",
        displayIcon: true,
      });
      return;
    }
    showNotificationMsg("Profile Updated", {
      variant: "success",
      displayIcon: true,
    });
    setStatus({ loading: false });
    // update auth user cookie
    auth.setUser(response.data); // TODO: make this cookies to not expire
    router.push("/profile/self");
  };

  const [resetPasswordReq, setResetPasswordReq] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(
    false
  );

  const handleChangePasswordReq = async () => {
    setResetPasswordReq(true);
    const response = await Auth.ForgotPassword({ email: profile?.email }).catch(
      (e) => {
        showNotificationMsg(
          e?.response?.data?.message?.includes("must be a valid email")
            ? "Invalid Email"
            : e?.response?.data?.message || "Some Error Occured",
          {
            variant: "error",
            displayIcon: true,
          }
        );
        return null;
      }
    );
    if (!response) {
      setResetPasswordReq(false);
      return;
    }
    showNotificationMsg("We have sent you an email for password recovery...!", {
      variant: "success",
      displayIcon: true,
    });
    setOpenChangePasswordDialog(true);
    setResetPasswordReq(false);
  };

  return (
    <>
      <ConfirmDialog
        open={openChangePasswordDialog}
        setOpen={setOpenChangePasswordDialog}
        Component={() => (
          <ChangePasswordForm
            email={profile?.email}
            showNotificationMsg={showNotificationMsg}
            setQuitReset={(bool) => setOpenChangePasswordDialog(!bool)}
          />
        )}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formLogin}>
        <div className={styles.profilePlayerHeader}>
          <div className={styles.profilePlayerHeaderInnerLeft}>
            <Avatar
              editMode
              onImagePicked={onImagePicked}
              src={image}
              className={styles.profilePlayerImage}
            />
          </div>
          <div className={styles.profilePlayerHeaderInnerRight}>
            <div>
              <Button type="submit" loading={status?.loading}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.profilePlayerBody}>
          <div className={styles.profilePlayerBodyContent}>
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <p>Full Name</p>
              <TemplateInput
                type="text"
                name="fullName"
                customProps={{ ...register("fullName") }}
                hint={
                  errors?.fullName && {
                    type: "error",
                    msg: errors?.fullName?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <p>Title</p>
              <TemplateSelect
                name="playerTitle"
                placeholder="Select Title"
                options={playerTitles}
                customProps={{ ...register("playerTitle") }}
                hint={
                  errors?.playerTitle && {
                    type: "error",
                    msg: errors?.playerTitle?.message,
                    inputBorder: true,
                  }
                }
              ></TemplateSelect>
            </div>
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <p>Email</p>
              <TemplateInput
                type="text"
                name="email"
                disabled
                customProps={{ ...register("email") }}
                hint={
                  errors?.email && {
                    type: "error",
                    msg: errors?.email?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <p>Telephone</p>
              <TemplateInput
                type="text"
                name="telephone"
                customProps={{ ...register("telephone") }}
                hint={
                  errors?.telephone && {
                    type: "error",
                    msg: errors?.telephone?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <p>Address</p>
              <TemplateInput
                type="text"
                name="address"
                customProps={{ ...register("address") }}
                hint={
                  errors?.address && {
                    type: "error",
                    msg: errors?.address?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <p>City</p>
              <TemplateInput
                type="text"
                name="city"
                customProps={{ ...register("city") }}
                hint={
                  errors?.city && {
                    type: "error",
                    msg: errors?.city?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <p>Country</p>
              <TemplateSelect
                name="country"
                placeholder="Select Country"
                options={countries}
                customProps={{ ...register("country") }}
                hint={
                  errors?.country && {
                    type: "error",
                    msg: errors?.country?.message,
                    inputBorder: true,
                  }
                }
              ></TemplateSelect>
            </div>
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <p>Postal Code</p>
              <TemplateInput
                type="text"
                name="postCode"
                customProps={{ ...register("postCode") }}
                hint={
                  errors?.postCode && {
                    type: "error",
                    msg: errors?.postCode?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
            <div
              className={cn(styles.span2, styles.profilePlayerBodyContentItem)}
            >
              <p>Bio</p>
              <TemplateInput
                type="text"
                name="bio"
                multiLine
                resizable={true}
                rows={4}
                customProps={{ ...register("bio") }}
                hint={
                  errors?.bio && {
                    type: "error",
                    msg: errors?.bio?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
          </div>
          <div className={styles.profilePlayerClubChips}>
            <div
              className={cn(styles.span3, styles.profilePlayerBodyContentItem)}
            >
              <p>Clubs</p>
            </div>
            {clubs.map((club, index) => (
              <div
                key={index}
                className={cn(
                  styles.span1,
                  styles.profilePlayerBodyContentItem
                )}
              >
                <Chip
                  image={club?.crest || "/assets/club-badge-placeholder.png"}
                  roundedImage
                  text={club.title}
                  onCloseClick={() => removeClub(club.id)}
                />
              </div>
            ))}
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <Chip
                component={
                  <Link href="/teamhub/join-club">
                    <a>
                      <DirectedButton direction="forward">
                        <span className={styles.btnChipPadding}>Join Club</span>
                      </DirectedButton>
                    </a>
                  </Link>
                }
              />
            </div>
          </div>
          <div className={styles.seperator}>
            <Seperator />
          </div>
          <div className={styles.profilePlayerClubChips}>
            <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <Button
                variant="cancel"
                type="button"
                onClick={handleChangePasswordReq}
                loading={resetPasswordReq}
              >
                Change Password
              </Button>
            </div>
            {/* <div
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <Button
                variant="cancel"
                type="button"
                onClick={() => alert("clicked")}
              >
                Change Email
              </Button>
            </div> */}
          </div>
        </div>
      </form>
    </>
  );
}

export default ProfileEdit;
