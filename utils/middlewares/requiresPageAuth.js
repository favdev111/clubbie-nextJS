import Auth from "@api/services/Auth";
import HTTPClient from "@api/HTTPClient";
import { parseCookies } from "@utils/helpers/parseCookies";

export const requiresPageAuth = (inner) => {
  return async (context) => {
    // get persitant user from cookie
    const cookies = parseCookies(context.req);
    const user = (() => {
      return typeof cookies.user === "string"
        ? JSON.parse(cookies.user)
        : cookies.user;
    })();
    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;

    // handle refresh tokens logic
    if (!user || !accessToken) {
      if (refreshToken) {
        await Auth.RefreshTokens({ refreshToken })
          .then((res) => {
            const tokens = res.data;
            context.setCookieForTokens = tokens;
          })
          .catch(() => {
            context.res.writeHead(307, { location: "/auth/login" });
            context.res.end();
            return { props: {} };
          });
      } else {
        context.res.writeHead(307, { location: "/auth/login" });
        context.res.end();
        return { props: {} };
      }
    }

    // set access header for axios, server side
    HTTPClient.setHeader(
      "Authorization",
      `Bearer ${accessToken || context?.setCookieForTokens?.access?.token}`
    );

    return inner ? inner(context) : { props: { user } };
  };
};
