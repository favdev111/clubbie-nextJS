import React from "react";
import Join from "@page/teamhub/join";
import Layout from "@layout/";
import Seo from "@layout/seo";
import Clubs from "@api/services/Clubs";
import HTTPClient from "@api/HTTPClient";
import { parseCookies } from "@utils/helpers/parseCookies";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function TeamhubJoinTeamPage({ club }) {
  return (
    <Layout>
      <Seo title="Join a team" desc="Lorem ipsum dolor sit amet" />
      <Join title="Join a Team" selectedClub={club} teams={club.teams} />
    </Layout>
  );
}

export default TeamhubJoinTeamPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const clubId = ctx.params.clubId; // get club id from params

  const cookies = parseCookies(ctx.req);

  HTTPClient.setHeader("Authorization", `Bearer ${cookies.access_token}`);

  const response = await Clubs.Get(clubId);
  const club = response.data[0];

  return {
    props: {
      club,
    },
  };
});
