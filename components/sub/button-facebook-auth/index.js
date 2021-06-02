import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const responseFacebook = (response) => {
  // Get the response for now
  console.log(response);
};

const FacebookButton = () => {
  return (
    <FacebookLogin
      appId={process.env.FACEBOOK_APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      scope="public_profile,user_friends,email"
      callback={responseFacebook}
      render={(renderProps) => (
        <div onClick={renderProps.onClick} className="pointer margin20">
          <img src="/assets/facebook.svg" alt="facebook-auth" />
        </div>
      )}
    />
  );
};

export default FacebookButton;
