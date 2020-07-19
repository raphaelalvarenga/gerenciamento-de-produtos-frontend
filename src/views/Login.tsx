import React, { FunctionComponent } from "react";
import { Card, Input, Space, Button, Alert } from "antd";
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import RequestInterface from "../interfaces/request-interface";
import md5 from "md5";
import ResponseInterface from "../interfaces/response-interface";
import { RouteComponentProps } from "react-router-dom";
import config from "../routines/config";
import { connect } from "react-redux";
import { pageHeaderToggle } from "../actions/PageHeaderAction";

const Login: FunctionComponent<RouteComponentProps> = (props) => {

    // This states will store the fields
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    // This will handle the success/error messages
    const [message, setMessage] = React.useState<{show: boolean, message: string}>({show: false, message: ""});

    // This will trigger when user tries to log in
    const login = async () => {
        
        const cryptPass = md5(password);
        const request: RequestInterface = {
            token: "",
            action: "login",
            idLogin: 0,
            params: { email, password: cryptPass }
        }

        const req = await fetch(`${config.url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        const response: ResponseInterface = await req.json();
        
        // If response isn't valid
        if (!response.success) {
            setMessage({show: true, message: response.message});
            return false;
        }
        
        // If response is valid, set the idLogin and token in localStorage
        localStorage.setItem("idLogin", response.params.idLogin);
        localStorage.setItem("token", response.params.token);

        // Order the PageHeader to show
        (props as any).pageHeaderToggle(true);

        // Redirect to home
        props.history.push("/");
    }
    
    return (
        <>
            <Card title = "Login" style = {{width: "500px", margin: "auto", marginTop: "50px"}}>
                <Space direction = "vertical" style = {{width: "100%"}}>
                    <Input
                        placeholder = "Enter your e-mail"
                        prefix = {<UserOutlined />}
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        onPressEnter =  {login}
                    />
                    <Input.Password
                        placeholder = "Enter your password"
                        prefix = {<LockOutlined />}
                        iconRender = {visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        onPressEnter = {login}
                    />
                    <Button type = "primary" onClick = {login}>Log in</Button>

                    {message.show && <Alert message = {message.message} type = "error" />}
                </Space>
            </Card>
        </>
    )
}

export default connect(null, { pageHeaderToggle })(Login);