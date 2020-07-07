import RequestInterface from "../interfaces/request-interface";
import config from "./config";

const logout = async () => {
    const request: RequestInterface = {
        token: JSON.stringify(localStorage.getItem("token")),
        action: "logout",
        idLogin: parseInt(JSON.stringify(localStorage.getItem("idLogin"))),
        params: {}
    };

    const req = await fetch(`${config.url}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    await req.json();

    localStorage.setItem("token", "");
    localStorage.setItem("idLogin", "0");
}

export default logout;