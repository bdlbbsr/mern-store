import Form from 'react-bootstrap/Form';
import { Container, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getAPI, postAPI } from "../../Services/apiRequests"
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    let getData = async (data) => {
        let res = await postAPI('/login', data)
        if (res.error) {
            console.log(res)
        } else {
            localStorage.setItem('token', JSON.stringify(res.token));
            if(res.role == 'user'){
                navigate('/about');
            } else {
                navigate('/cart');
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        getData(inputs)
    };
    return (
        <Container style={{ marginTop: '200px' }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder=" " name="email" value={inputs.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder=" " name="password" value={inputs.password} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
export default Login;