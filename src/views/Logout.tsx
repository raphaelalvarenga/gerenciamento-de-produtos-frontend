import React, { FunctionComponent } from "react";
import logout from "../routines/logout";
import { RouteComponentProps } from "react-router-dom";

const makeLogout = async (props: RouteComponentProps) => {
    await logout();
    props.history.push("login");
}

const Logout: FunctionComponent<RouteComponentProps> = (props) => {
    React.useEffect(() => {
        makeLogout(props);
    }, [props])

    return (<div></div>)
};

export default Logout;