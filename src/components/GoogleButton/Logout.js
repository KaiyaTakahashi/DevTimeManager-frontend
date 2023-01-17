import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const clientId = "985770492377-a2nlp1h94mi7s7v861khiturmfqs9gsm.apps.googleusercontent.com";

var Logout = () => {
    return (
        <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={() => {
                console.log("Log out successfull")
                localStorage.setItem("isLoggedin", false);
                localStorage.setItem("imageUrl", null);
                localStorage.setItem("email", null);
                localStorage.setItem("name", "user");
                window.location.reload();
            }}
        />
    )
}

export default Logout;