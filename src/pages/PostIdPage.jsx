import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostsService from "../API/PostsService";
import {useFetching} from "../componets/hooks/useFetching";
import Loader from "../componets/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostsService.getById(id)
        setPost(response.data)
    })
    const [fetchСomments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostsService.getCommentsByPostId(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchСomments(params.id)
    }, [])

    return (
        <div>
            <h1>Вы попали на страницу поста c Id = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h1 style={{marginTop: 40}}>Комментарии</h1>
            {
                isComLoading
                    ?
                    <Loader/>
                    :
                    <div>
                        {
                            comments.map(com =>
                                <div style={{marginTop: 15}} key={com.id}>
                                    <h5>{com.email}</h5>
                                    <div>{com.body}</div>
                                </div>)
                        }
                    </div>
            }
        </div>
    );
};

export default PostIdPage;