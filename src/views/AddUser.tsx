import React, { FunctionComponent } from "react";
import { Input, Row, Col, Button, Alert, Spin } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, SaveOutlined, EyeTwoTone, EyeInvisibleOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import UserInterface from "../interfaces/user-interface";
import RequestInterface from "../interfaces/request-interface";
import config from "../routines/config";
import ResponseInterface from "../interfaces/response-interface";
import md5 from "md5";
import { RouteComponentProps } from "react-router-dom";

const AddUser: FunctionComponent<RouteComponentProps> = (props) => {

    // This state will store newUser's data, filled up in the form
    const [newUser, setNewUser] = React.useState<UserInterface>({
        idLogin: 0, name: "", email: "", password: ""
    });

    // This state will to handle the confirm password field
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");

    // This state will handle the success/error messages
    const [alert, setAlert] = React.useState<{show: boolean, message: string, type: string}>({show: false, message: "", type: ""})

    // This will appear when a request is made
    const [spin, setSpin] = React.useState<boolean>(false);

    // This is triggered when use clicks on Save
    const addNewUser = async () => {
        const conditionals: boolean[] = [
            newUser.name === "",
            !(/@./.test(newUser.email)),
            !(/[a-z]/.test(newUser.password)),
            !(/[0-9]/.test(newUser.password)),
            !(/[^0-9a-z]/i.test(newUser.password)),
            !(confirmPassword === newUser.password && newUser.password !== "")
        ];

        // If one of the conditions above is true...
        if (conditionals.includes(true)) {
            setAlert({show: true, type: "error", message: "Please, check the validations list!"})
            return false;
        }

        // If everything is right, the request will be made and spin will appear
        setSpin(true);

        const {name, email, password} = newUser;

        const cryptPass = md5(password);

        const request: RequestInterface = {
            token: localStorage.getItem("token")!,
            action: "registerUser",
            idLogin: parseInt(JSON.stringify(localStorage.getItem("idLogin"))),
            params: { name, email, password: cryptPass }
        }

        const req = await fetch(`${config.url}/register-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        const response: ResponseInterface = await req.json();

        // If the response is successful, the alert will feedback the user
        if (response.success) {
            setAlert({show: true, type: "success", message: "User created successfully!"})
            setSpin(false);
            return false;
        }

        // If the token has expired, redirect to /login page
        if (response.message === "Invalid-token") {
            localStorage.setItem("token", "");
            props.history.push("/login");
            setSpin(false);
            return false;
        }

        // Any other error, a message will appear
        setAlert({show: true, type: "error", message: response.message})
        setSpin(false);
    }
    
    return (
        <>
            <form>
                <Row style = {{maxWidth: "1200px", marginBottom: "20px", marginTop: "20px"}} justify = "center">
                    <Col xs = {12}>
                        <Input
                            required
                            placeholder = "Name"
                            prefix = {<UserOutlined />}
                            value = {newUser.name}
                            onChange = {(e) => setNewUser({...newUser, name: e.target.value})}
                            onPressEnter = {addNewUser}
                        />
                    </Col>
                </Row>

                <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                    <Col xs = {12}>
                        <Input
                            required
                            type = "email"
                            placeholder = "E-mail"
                            prefix = {<MailOutlined />}
                            value = {newUser.email}
                            onChange = {(e) => setNewUser({...newUser, email: e.target.value})}
                            onPressEnter = {addNewUser}
                        />
                    </Col>
                </Row>

                <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                    <Col xs = {12}>
                        <Input.Password
                            required
                            placeholder = "Password"
                            prefix = {<LockOutlined />}
                            iconRender = {visiblePass => visiblePass ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                            value = {newUser.password}
                            onChange = {(e) => setNewUser({...newUser, password: e.target.value})}
                            onPressEnter = {addNewUser}
                        />
                    </Col>
                </Row>

                <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                    <Col xs = {12}>
                        <Input.Password
                            required
                            placeholder = "Confirm password"
                            prefix = {<LockOutlined />}
                            iconRender = {visiblePass => visiblePass ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                            value = {confirmPassword}
                            onChange = {(e) => setConfirmPassword(e.target.value)}
                            onPressEnter = {addNewUser}
                        />
                    </Col>
                </Row>

                {
                    (newUser.name !== "" || newUser.email !== "" || newUser.password !== "" || confirmPassword !== "") &&
                    <>
                    <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                        <Col xs = {12} style = {{color: newUser.name !== "" ? "green" : "red"}}>
                            {
                                newUser.name === "" ? <CloseOutlined /> : <CheckOutlined />
                            }
                            Name must be filled
                        </Col>
                    </Row>

                    <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                        <Col xs = {12} style = {{color: (/@./.test(newUser.email)) ? "green" : "red"}}>
                            {
                                !(/@./.test(newUser.email)) ? <CloseOutlined /> : <CheckOutlined />
                            }
                            E-mail must be valid
                        </Col>
                    </Row>

                    <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                        <Col xs = {12} style = {{color: (/[a-z]/.test(newUser.password)) ? "green" : "red"}}>
                            {
                                (/[a-z]/.test(newUser.password)) ? <CheckOutlined /> : <CloseOutlined />
                            }
                            Password contains letters
                        </Col>
                    </Row>

                    <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                        <Col xs = {12} style = {{color: (/[0-9]/.test(newUser.password)) ? "green" : "red"}}>
                            {
                                (/[0-9]/.test(newUser.password)) ? <CheckOutlined /> : <CloseOutlined />
                            }
                            Password contains numbers
                        </Col>
                    </Row>

                    <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                        <Col xs = {12} style = {{color: (/[^0-9a-z]/i.test(newUser.password)) ? "green" : "red"}}>
                            {
                                (/[^0-9a-z]/i.test(newUser.password)) ? <CheckOutlined /> : <CloseOutlined />
                            }
                            Password contains special characters
                        </Col>
                    </Row>

                    <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                        <Col xs = {12} style = {{color: confirmPassword === newUser.password && newUser.password !== "" ? "green" : "red"}}>
                            {
                                confirmPassword === newUser.password && newUser.password !== "" ? <CheckOutlined /> : <CloseOutlined />
                            }
                            Confirm password matches password
                        </Col>
                    </Row>

                </>}
                    <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                        <Col xs = {12}>
                            <Button
                                type = "primary"
                                icon = {<SaveOutlined />}
                                onClick = {addNewUser}
                            >Save</Button>
                        </Col>
                    </Row>

                    <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center">
                        {alert.show && alert.type === "error" && <Alert type = "error" message = {alert.message} />}
                        {alert.show && alert.type === "success" && <Alert type = "success" message = {alert.message} />}
                    </Row>
            </form>

            {
                spin && <Row justify = "center">
                    <Col>
                        <Spin size = "large" />
                    </Col>
                </Row>
            }
        </>
    )
}

export default AddUser;