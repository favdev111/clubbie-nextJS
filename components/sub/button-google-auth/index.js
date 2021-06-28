import React from "react";
import GoogleLogin from "react-google-login";
import NotificationSnack from "@sub/notification-snack";
import Auth from "@api/services/Auth";
import Google from "@svg/social/google";

const GoogleButton = () => {
  // TODO: redirect after login
  const [error, setError] = React.useState("");

  const handleResponse = (res) => {
    const { tokenId } = res;
    const payload = {
      id_token: tokenId,
    };
    // auth.GoogleLogin here
    Auth.GoogleLogin(payload)
      .then((res) => console.log("res google => ", res.response))
      .catch((err) => console.log("err google => ", err.response));
  };

  const handleError = (err) => {
    setError(err.error);
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
      {error && (
        <NotificationSnack
          message={error}
          onFinished={() => error && setError("")}
        />
      )}
    </>
  );
};

export default GoogleButton;
