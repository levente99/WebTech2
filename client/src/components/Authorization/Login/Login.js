import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import './Login.css';

const Login = ({ login }) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    let sendLogin = (e) => {
        e.preventDefault();
        const loginUser = { name, password };
        fetch('http://localhost:9000/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginUser)
        }).then((res) => {
            if (res.status === 200) {
                login();
                history.push('/');
            } else if (res.status === 401) {
                setError("Rossz felhasználónév vagy jelszó!")
            } else {
                throw res.error;
            }
        });
    }

    return (
        <div className="container">
            {error != "" ? <Alert severity="error">{error}</Alert> : null}
            <FormControl className="email-container">
                <InputLabel htmlFor="name">Név</InputLabel>
                <Input id="name" onChange={(e) => setName(e.target.value)} aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl className="password-container">
                <InputLabel htmlFor="password" >Jelszó</InputLabel>
                <Input id="email" type="password" onChange={(e) => setPassword(e.target.value)} aria-describedby="my-helper-text" />
            </FormControl>

            <Button color="primary" onClick={sendLogin}>Bejelentkezés</Button>

            <p>Nincs fiókod? Regisztrálj!</p>
            <Link className="register-button" to={{
                pathname: "/register",
            }}>Regisztráció</Link>

        </div>
    )
}

export default Login;