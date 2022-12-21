import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Axios from 'axios';

Axios.defaults.withCredentials = true
const clientId = "985770492377-a2nlp1h94mi7s7v861khiturmfqs9gsm.apps.googleusercontent.com";

var Login = () => {
    const onSuccess = (res) => {
        console.log("Login successfull",res);
        Axios.post('http://localhost:3001/api/create_tokens', res).then((response) => {
            console.log("This is response", response.data);
            localStorage.setItem("isLoggedin", true)
        }).catch((err) => {
            console.log(err.message);
            localStorage.setItem("isLoggedin", false);
        })
    }

    return (
        <GoogleLogin
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={(res) => {console.log("Log in failed", res)}}
            buttonText={"Login"}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            // Refresh Token
            responseType='code'
            accessType='offline'
            scope='openid email profile https://www.googleapis.com/auth/calendar'
        />
    )
}

export default Login;