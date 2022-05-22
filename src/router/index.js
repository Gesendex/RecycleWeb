import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import GarbageTypes from "../pages/GarbageTypes";
import GarbageCollectionPoints from "../pages/GarbageCollectionPoints";
import GarbageCollectionPointComments from "../pages/GarbageCollectionPointComments";
import MyGarbageCollectionPoints from "../pages/MyGarbageCollectionPoints";

export const privateRoutes = [
    {path: '/about', element: <About/>, exact: true},
    {path: '/posts', element: <Posts/>, exact: true},
    {path: '/posts/:id', element: <PostIdPage/>, exact: true},
    {path: '/garbagetypes', element: <GarbageTypes/>, exact: true},
    {path: '/garbagecollectionpoints', element: <GarbageCollectionPoints/>, exact: true},
    {path: '/garbagecollectionpoints/:id/comments', element: <GarbageCollectionPointComments/>, exact: true},
]

export const privateOwnerRoutes = [
    {path: '/mygarbagecollectionpoints', element: <MyGarbageCollectionPoints/>, exact: true},
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true}
]