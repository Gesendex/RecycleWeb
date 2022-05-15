import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context";
import classes from "./Navbar.module.css";
import linkClass from "../button/NavbarButton.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import NavbarButton from "../button/NavbarButton";

const Navbar = () => {
    const router = useNavigate()
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [index, setIndex] = useState('');

    const exit = (event) => {
        event.preventDefault()
        setIsAuth(false)
        localStorage.removeItem('auth')
        dispatch({type: 'RemoveUser'})
    }

    const click = (e, route) => {
        if (isAuth) {
            setIndex(e.target.id)
        }
        router(route)
    }

    return (
        <div className={classes.navbar}>
            <div>
                <NavbarButton id='about'
                              className={index === 'about' ? linkClass.navbar_btn_active : linkClass.navbar_btn}
                              onClick={(e) => click(e, `/about`)}>О сайте</NavbarButton>
                <NavbarButton id='posts'
                              className={index === 'posts' ? linkClass.navbar_btn_active : linkClass.navbar_btn}
                              onClick={(e) => click(e, `/posts`)}>Посты</NavbarButton>
                <NavbarButton id='garbagetypes'
                              className={index === 'garbagetypes' ? linkClass.navbar_btn_active : linkClass.navbar_btn}
                              onClick={(e) => click(e, `/garbagetypes`)}>Типы мусора</NavbarButton>
                <NavbarButton id='garbagecollectionpoints'
                              className={index === 'garbagecollectionpoints' ? linkClass.navbar_btn_active : linkClass.navbar_btn}
                              onClick={(e) => click(e, `/garbagecollectionpoints`)}>Точки раздельного сбора
                    мусора</NavbarButton>
            </div>

            <div className={classes.exit_btn}>
                {user ? <strong style={{marginRight: 20}}>{[user.username].join(' ')}</strong> : ""}
                {
                    isAuth ?
                        <NavbarButton id="exit" className={linkClass.navbar_btn_exit} onClick={exit}>
                            Выйти
                        </NavbarButton>
                        : ''
                }

            </div>
        </div>
    );
};

export default Navbar;