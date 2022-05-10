import React, {useContext} from 'react';
import {AuthContext} from "../../../context";
import MyButton from "../button/MyButton";
import classes from "./Navbar.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const router = useNavigate()
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const exit = (event) => {
        event.preventDefault()
        setIsAuth(false)
        localStorage.removeItem('auth')
        dispatch({type: 'RemoveUser'})
    }

    return (
        <div className={classes.navbar}>
            <div className={classes.navbar__links}>
                <MyButton onClick={() => router(`/about`)}>О сайте</MyButton>
                <MyButton onClick={() => router(`/posts`)}>Посты</MyButton>
                <MyButton onClick={() => router(`/garbagetypes`)}>Типы мусора</MyButton>
                <MyButton onClick={() => router(`/garbagecollectionpoints`)}>Точки раздельного сбора мусора</MyButton>
            </div>
            <div className={classes.exit_btn}>
                {user ? <strong style={{marginRight: 20}}>{[user.username].join(' ')}</strong> : ""}
                <MyButton onClick={exit}>
                    Выйти
                </MyButton>
            </div>
        </div>
    );
};

export default Navbar;