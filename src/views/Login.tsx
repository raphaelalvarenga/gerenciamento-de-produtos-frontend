import React, { FunctionComponent } from "react";
import { Card, Input, Space, Button, Alert } from "antd";
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import RequestInterface from "../interfaces/request-interface";
import md5 from "md5";
import ResponseInterface from "../interfaces/response-interface";
import { RouteComponentProps } from "react-router-dom";

const Login: FunctionComponent<RouteComponentProps> = (props) => {

    const [email, setEmail] = React.useState<string>("johnlennon@gmail.com");
    const [password, setPassword] = React.useState<string>("yoko@123");
    const [message, setMessage] = React.useState<{show: boolean, message: string}>({show: false, message: ""});

    const login = async () => {
        const cryptPass = md5(password);
        const request: RequestInterface = {
            token: "",
            action: "login",
            idLogin: 0,
            params: { email, password: cryptPass }
        }

        const req = await fetch("https://gerenciamento-de-produtos-back.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        const response: ResponseInterface = await req.json();
        
        if (!response.success) {
            setMessage({show: true, message: response.message});
        } else {
            localStorage.setItem("idLogin", response.params.idLogin);
            localStorage.setItem("token", response.params.token);

            props.history.push("/");
        }
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
                    />
                    <Input.Password
                        placeholder = "Enter your password"
                        prefix = {<LockOutlined />}
                        iconRender = {visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    <Button type = "primary" onClick = {login}>Log in</Button>

                    {message.show && <Alert message = {message.message} type = "error" />}
                </Space>
            </Card>
        </>
    )
}

export default Login;