import React from 'react';
import { Form, Input, Card, Layout, Typography, Col, Row } from 'antd'
const { Title } = Typography
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { notification, SubmitButton } from '../../components/primitives';
import useAuth from 'hooks/useAuth';

const Login = () => {
    const { login } = useAuth()

    const onFinish = async (values) => {
        const result = await login({ email: values.email, password: values.password })
        if (result.error) return notification.loginError()
    }

    return (
        <Layout.Content>
            <Row justify="space-around" align="middle" style={{ height: '100vh' }}>
                <Col xl={8} xs={22}>
                    <Card >
                        <Title style={{ textAlign: "center", fontWeight: "200" }}>Atila</Title>
                        <Form
                            name="normal_login"
                            style={{ width: "80%", margin: "auto" }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: '!Por favor coloca tu Email!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '!Por favor coloca tu Contraseña!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Contraseña"
                                />
                            </Form.Item>
                            <Form.Item>
                                <SubmitButton>
                                    Entrar
                                </SubmitButton>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout.Content>
    );
}
export default Login;
