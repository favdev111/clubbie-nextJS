import React from "react";
import GoogleLogin from "react-google-login";

const responseGoogle = (response) => {
  console.log(response);
  console.log(response.tokenId);
  var res = response.profileObj;
  console.log(res);
};

const GoogleButton = () => {
  return (
    <GoogleLogin
      clientId={process.env.GOOLGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <div onClick={renderProps.onClick} className="pointer margin20">
          <img src="/assets/google.svg" alt="google-auth" />
        </div>
      )}
    />
  );
};

export default GoogleButton;
