import { useContext } from "react"
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
    const { loginInfo, updateLoginInfo, loginUser, loginError, loginLoading, } = (useContext(AuthContext))
    return (
        <>
            <Form onSubmit={loginUser}>
                <Row style={{
                    height: "100vh",
                    justifyContent: "center",
                    paddingTop: "20%"
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Login</h2>
                            <Form.Control type="text" placeholder="Email" onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })} />
                            <Form.Control type="text" placeholder="Password" onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} />
                            <Button className="primary" type="Submit"> Login</Button>
                            {loginError?.error && (
                                <Alert variant="danger">
                                    <p className="error">{loginError.error}</p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Login
