import React from "react";
import ClubPage from "@page/club";
import Layout from "@layout";
import Seo from "@layout/seo";
import Clubs from "@api/services/Clubs";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function Club({ club, user }) {
  return (
    <Layout>
      <Seo title="Club" desc="Lorem ipsum dolor sit amet" />
      <ClubPage club={club} user={user} />
    </Layout>
  );
}

export default Club;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const clubId = ctx.params.id;

  let club = null;

  // get the club
  const response = await Clubs.Get(clubId).catch(() => null);
  if (response) club = response?.data[0];

  const notFound = !club;

  return {
    props: {
      club: club,
    },
    notFound: notFound,
  };
});
