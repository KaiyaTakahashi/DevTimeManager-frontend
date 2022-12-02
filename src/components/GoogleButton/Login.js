import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Axios from 'axios';

Axios.defaults.withCredentials = true
const clientId = "985770492377-a2nlp1h94mi7s7v861khiturmfqs9gsm.apps.googleusercontent.com";

var Login = () => {
    // useEffect(() => {
    //     function start() {
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: "",
    //         })
    //     };
    //     gapi.load('client:auth2', start);
    // })
    const onSuccess = (res) => {
        console.log("Login successfull",res);
        localStorage.setItem("isLoggedin", true);
        Axios.post('http://localhost:3001/api/create_tokens', res).then((response) => {
            console.log("This is response", response.data)
        }).catch((err) => {
            localStorage.setItem("isLoggedin", false);
            console.log(err.message);
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