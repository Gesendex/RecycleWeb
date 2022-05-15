import React, {useContext, useState} from 'react';
import {AuthContext} from "../context";
import PostsService from "../API/PostsService";
import {useDispatch} from "react-redux";
import classes from "./style/Login.module.css";
import LoginInput from "../componets/UI/input/LoginInput";
import NavbarButton from "../componets/UI/button/NavbarButton";
import linkClass from "../componets/UI/button/LoginButton.module.css";
import logo from '../assets/login.jpg';

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const dispatch = useDispatch()

    const [credentials, setCredentials] = useState({})

    const login = async (event) => {
        event.preventDefault()
        const client = await PostsService.authorize(credentials);
        if (client) {
            localStorage.setItem('auth', 'true')
            dispatch({type: "SetUser", payload: client})
            setIsAuth(true)
        }
    }

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <form onSubmit={login} className={classes.form}>
                    <div className={classes.fields}>
                        <h1>Reuse Reduce Recycle</h1>
                        <LoginInput type="text"
                                    onChange={(event) => setCredentials({...credentials, email: event.target.value})}
                                    placeholder="Логин..."
                        />
                        <LoginInput type="Password"
                                    onChange={(event) => setCredentials({...credentials, password: event.target.value})}
                                    placeholder="Пароль..."
                        />
                        <NavbarButton className={linkClass.login_btn} onClick={login}>Войти</NavbarButton>
                    </div>
                </form>
                <div className={classes.img}>
                    <img src={logo} alt="null"/>
                </div>
            </div>
        </div>
    );
};

export default Login;