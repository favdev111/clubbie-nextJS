import React from "react";
import ClubPage from "@page/club";
import Layout from "@layout";
import Clubs from "@api/services/Clubs";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function Club({ club, user }) {
  return (
    <Layout>
      <Seo title="Edit Club" desc="Lorem ipsum dolor sit amet" />
      <ClubPage club={club} user={user} editMode={true} />
    </Layout>
  );
}

export default Club;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const clubId = ctx.params.id;
  const user = ctx.user;

  let club = null;

  // get the club
  const response = await Clubs.Get(clubId).catch(() => null);
  if (response)
    club =
      response?.data && response?.data?.length > 0 ? response?.data[0] : null;

  const isOwner = club?.owner?.id === user?.id ? true : false;

  const notFound = !club || !isOwner;

  return {
    props: {
      club: club,
    },
    notFound: notFound,
  };
});
