import React, { FunctionComponent } from "react";
import logout from "../routines/logout";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { pageHeaderToggle } from "../actions/PageHeaderAction";

const makeLogout = async (props: RouteComponentProps) => {
    await logout();
    (props as any).pageHeaderToggle(false);
    props.history.push("login");
}

const Logout: FunctionComponent<RouteComponentProps> = (props) => {
    React.useEffect(() => {
        makeLogout(props);
    }, [props])

    return (<div></div>)
};

export default connect(null, { pageHeaderToggle })(Logout);