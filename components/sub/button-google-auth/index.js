import React from "react";
import GoogleLogin from "react-google-login";
import useNotification from "@sub/hook-notification";
import Auth from "@api/services/Auth";
import Google from "@svg/social/google";

const GoogleButton = () => {
  // TODO: redirect after login
  const { showNotificationMsg } = useNotification();

  const handleResponse = async (res) => {
    const { tokenId } = res;
    const payload = {
      id_token: tokenId,
    };
    // auth.GoogleLogin here
    await Auth.GoogleLogin(payload)
      .then((res) => {
        console.log("res google => ", res.response);
        showNotificationMsg(res.response, {
          variant: "success",
          displayIcon: true,
        });
      })
      .catch((err) => {
        console.log("err google => ", err.response);
        showNotificationMsg(err.response, {
          variant: "error",
          displayIcon: true,
        });
      });
  };

  const handleError = (err) => {
    showNotificationMsg(err.error, {
      variant: "error",
      displayIcon: true,
    });
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={handleResponse}
        onFailure={handleError}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <div onClick={renderProps.onClick} className="auth-icon">
            <Google />
          </div>
        )}
      />
    </>
  );
};

export default GoogleButton;
