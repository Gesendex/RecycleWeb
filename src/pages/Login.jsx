import React, {useContext, useState} from 'react';
import MyInput from "../componets/UI/input/MyInput";
import MyButton from "../componets/UI/button/MyButton";
import {AuthContext} from "../context";
import PostsService from "../API/PostsService";
import {useDispatch, useSelector} from "react-redux";

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
        <div>
            <h1>Страница входа</h1>
            <form onSubmit={login}>
                <MyInput type="text"
                         onChange={(event) => setCredentials({...credentials, email: event.target.value})}
                         placeholder="Логин"
                />
                <MyInput type="Password"
                         onChange={(event) => setCredentials({...credentials, password: event.target.value})}
                         placeholder="Пароль"
                />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;