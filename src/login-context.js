import React from "react";

const LoginContext = () => {

    return React.createContext({
        token: null,
        loggedIn: false
    });
}

export default LoginContext;