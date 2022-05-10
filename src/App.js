import React, {useEffect, useMemo, useState} from 'react';
import './styles/App.css'
import {BrowserRouter} from "react-router-dom";
import Navbar from "./componets/UI/NavBar/Navbar";
import AppRouter from "./componets/AppRouter";
import {AuthContext} from "./context";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false)
    })

    return (
        <AuthContext.Provider value={
            {
                isAuth,
                setIsAuth: setIsAuth,
                isLoading
            }
        }>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

/*
async function logIn()
{
    let user = {
    email: 'gireev2003@mail.ru',
    password: '123456'
};

    let response = await fetch('https://localhost:44373/api/User/Authorization', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'accept':'text/plain',
    '':
},
    body: JSON.stringify(user)
});

    let result = await response.json();
    console.log(result.name)
}
*/
export default App;
