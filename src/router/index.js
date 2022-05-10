import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import GarbageTypes from "../pages/GarbageTypes";
import GarbageCollectionPoints from "../pages/GarbageCollectionPoints";

export const privateRoutes = [
    {path: '/about', element: <About/>, exact: true},
    {path: '/posts', element: <Posts/>, exact: true},
    {path: '/posts/:id', element: <PostIdPage/>, exact: true},
    {path: '/garbagetypes', element: <GarbageTypes/>, exact: true},
    {path: '/garbagecollectionpoints', element: <GarbageCollectionPoints/>, exact: true},
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true}
]