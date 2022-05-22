import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateOwnerRoutes, privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    const user = useSelector(state => state.user.user)

    if (isLoading) {
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
                user.roleId >=2
                ?
                {
                    privateOwnerRoutes.map(item =>
                        <Route
                            path={item.path}
                            element={item.element}
                            exact={item.exact}
                            key={item.path}
                        />
                    )
                }
                :
                <>
                </>
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