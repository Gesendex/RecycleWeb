import React, {useCallback, useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../router";
import Login from "../pages/Login";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if(isLoading)
    {
        return <Loader/>

    }

    return (
        isAuth
            ?
            <Routes>
                {
                    privateRoutes.map(item =>
                        <Route
                            path={item.path}
                            element={item.element}
                            exact={item.exact}
                            key={item.path}
                        />
                    )
                }
                <Route path="*" element={<Navigate to="/about"/>}/>
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map(item =>
                        <Route
                            path={item.path}
                            element={item.element}
                            exact={item.exact}
                            key={item.path}
                        />
                    )
                }
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
    );
};

export default AppRouter;