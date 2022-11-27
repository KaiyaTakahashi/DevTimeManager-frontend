import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = "252537839800-gisn0d87ekkklurcq00ucglil44tmmpm.apps.googleusercontent.com";

var Login = () => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            })
        };
        gapi.load('client:auth2', start);
    })
    return (
        <GoogleLogin
            clientId={clientId}
            onSuccess={(res) => {console.log("Log in successfull", res.profileObj)}}
            onFailure={(res) => {console.log("Log in failed", res)}}
            buttonText={"Login"}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
        />
    )
}

export default Login;