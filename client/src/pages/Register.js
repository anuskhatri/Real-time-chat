import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const {
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        registerLoading,
    } = useContext(AuthContext);

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        return password.length >= 6;
    };

    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }

        if (!isEmailValid(registerInfo.email)) {
            alert("Invalid email address");
            return;
        }

        if (!isPasswordValid(registerInfo.password)) {
            alert("Password must be at least 6 characters");
            return;
        }

        registerUser();
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row
                    style={{
                        height: "100vh",
                        justifyContent: "center",
                        paddingTop: "20%",
                    }}
                >
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Register</h2>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Button className="primary" type="submit">
                                {registerLoading
                                    ? "Creating Account"
                                    : "Register"}
                            </Button>
                            {registerError?.error && (
                                <Alert variant="danger">
                                    <p className="error">
                                        {registerError.error}
                                    </p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Register;