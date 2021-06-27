import React from "react";
import Join from "@page/teamhub/join";
import Layout from "@layout/";
import Seo from "@layout/seo";
import Clubs from "@api/services/Clubs";
import HTTPClient from "@api/HTTPClient";
import { parseCookies } from "@utils/helpers/parseCookies";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function TeamhubRegisterTeamPage({ club }) {
  return (
    <Layout>
      <Seo title="Register a team" desc="Lorem ipsum dolor sit amet" />
      <Join
        title="Register a Team"
        selectedClub={club}
        teams={club.teams}
        register
      />
    </Layout>
  );
}

export default TeamhubRegisterTeamPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const clubId = ctx.params.clubId; // get club id from params

  const response = await Clubs.Get(clubId).catch(() => false);
  const club = response?.data[0];
  const notFound = !club;

  return {
    props: {
      club,
    },
    notFound: notFound,
  };
});
