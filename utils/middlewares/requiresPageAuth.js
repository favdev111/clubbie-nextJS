import Auth from "@api/services/Auth";
import HTTPClient from "@api/HTTPClient";
import { parseCookies } from "@utils/helpers/parseCookies";

/**
 * Requires user auth to view a page.
 * Handles logic to keep user logged in with access/refresh tokens.
 * Updates server side axios access header
 * @param {Function|undefined} getPropsFunc - Next.Js server func, one of [ getServerSideProps, getStaticProps, getInitialProps ]
 * @returns {Props}
 */
export const requiresPageAuth = (getPropsFunc) => {
  return async (context) => {
    // cookie user
    const cookies = parseCookies(context.req);
    const user = (() => {
      return typeof cookies.user === "string"
        ? JSON.parse(cookies.user)
        : cookies.user;
    })();
    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;

    // set user in context
    context.user = user;

    // refresh tokens logic
    let requireLogin = false;
    if (!user || !accessToken) {
      if (refreshToken) {
        await Auth.RefreshTokens({ refreshToken })
          .then((res) => {
            const tokens = res.data;
            context.setCookieForTokens = tokens;
          })
          .catch(() => {
            requireLogin = true;
          });
      } else {
        requireLogin = true;
      }
    }

    // user must login
    if (requireLogin) {
      return {
        redirect: {
          destination: "/auth/login",
          statusCode: 307,
        },
      };
    } else {
      // set axios access header, server side
      HTTPClient.setHeader(
        "Authorization",
        `Bearer ${accessToken || context?.setCookieForTokens?.access?.token}`
      );

      // props for client side
      const props = await (async () => {
        const innerProps = getPropsFunc ? await getPropsFunc(context) : {};
        const commonProps = { props: { user } };
        return {
          props: {
            setCookiesOnClient: context.setCookieForTokens
              ? {
                  tokens: context.setCookieForTokens,
                }
              : false,
            ...innerProps?.props,
            ...commonProps.props,
          },
          notFound: innerProps?.notFound,
        };
      })();

      return props;
    }
  };
};
