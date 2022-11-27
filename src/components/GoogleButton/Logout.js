import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const clientId = "252537839800-gisn0d87ekkklurcq00ucglil44tmmpm.apps.googleusercontent.com";

var Logout = () => {
    return (
        <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={() => {console.log("Log out successfull")}}
        />
    )
}

export default Logout;