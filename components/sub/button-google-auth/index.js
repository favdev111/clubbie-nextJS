import React from "react";
import GoogleLogin from "react-google-login";
import { googleLogin } from "@redux/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import NotificationSnack from "@sub/notification-snack";

const GoogleButton = () => {
  // TODO: redirect after login
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");
  const googleLoginError = useSelector(
    (state) => state.auth.errors.googleLoginError
  );

  const handleResponse = (res) => {
    const { tokenId } = res;
    const credentials = {
      id_token: tokenId,
    };
    dispatch(googleLogin(credentials));
  };

  const handleError = (err) => {
    setError(err.error);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.GOOLGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={handleResponse}
        onFailure={handleError}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <div onClick={renderProps.onClick} className="pointer margin20">
            <img src="/assets/google.svg" alt="google-auth" />
          </div>
        )}
      />
      {(error || googleLoginError) && (
        <NotificationSnack
          message={error || googleLoginError}
          onFinished={() => error && setError("")}
        />
      )}
    </>
  );
};

export default GoogleButton;
