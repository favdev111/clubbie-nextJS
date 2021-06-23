import React from "react";
import Cookies from "js-cookie";
import ProfileSelf from "@page/profile-self";
import Layout from "@layout";
import Seo from "@layout/seo";
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
      <Seo title="My Profile" desc="Lorem ipsum dolor sit amet" />
      <ProfileSelf profile={authUser?.profile} />
    </Layout>
  );
}

export default ProfilePage;

export const getServerSideProps = requiresPageAuth();
