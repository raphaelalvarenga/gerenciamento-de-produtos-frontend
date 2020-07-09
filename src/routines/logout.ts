import RequestInterface from "../interfaces/request-interface";
import config from "./config";

const logout = async () => {

    // This is the request body
    const request: RequestInterface = {
        token: localStorage.getItem("token")!,
        action: "logout",
        idLogin: parseInt(JSON.stringify(localStorage.getItem("idLogin"))),
        params: {}
    };

    // This is the whole request
    const req = await fetch(`${config.url}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    await req.json();

    // Reseting token and idLogin
    localStorage.setItem("token", "");
    localStorage.setItem("idLogin", "0");
}

export default logout;