import React from "react";
import TeamPage from "@page/team";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function Team({ team }) {
  return (
    <Layout>
      <Seo title="Team" desc="Lorem ipsum dolor sit amet" />
      <TeamPage team={team} />
    </Layout>
  );
}

export default Team;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const team = {
    id: "60d371268ffc8b40e175fb4b",
    title: "Open Aged M",
    crest:
      "https://s3.amazonaws.com/com.clubbie.team.images.dev/60d371268ffc8b40e175fb4b/7de96c59-843e-4aea-8d19-f237c021146a.jpg",
    owner: {
      id: "60d36cb68ffc8b40e175fb3f",
      name: "eray gundogmus",
      playerTitle: "team leader",
    },
    coach: {
      id: "60d3708d8ffc8b40e175fb45",
    },
    leader: {
      id: "60d370d58ffc8b40e175fb48",
    },
    players: [
      {
        status: "approved",
        user: {
          id: "60d3720d8ffc8b40e175fb4d",
        },
      },
    ],
    club: {
      crest:
        "https://s3.amazonaws.com/com.clubbie.club.images.dev/60d36dc88ffc8b40e175fb43/5a9252f2-ab66-49b8-8e7b-0b6a9721b5ef.jpg",
      title: "Old Foresters F.C.",
      id: "60d36dc88ffc8b40e175fb43",
    },
    subscriptionPlans: [],
  };

  const notFound = false;

  return {
    props: {
      team: team,
    },
    notFound: notFound,
  };
});
