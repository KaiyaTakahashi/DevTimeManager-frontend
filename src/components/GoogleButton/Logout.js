import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";

var Logout = () => {
    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
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