import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostsService from "../API/PostsService";
import {useFetching} from "../componets/hooks/useFetching";
import Loader from "../componets/UI/Loader/Loader";
import {useSelector} from "react-redux";
import CommentList from "../componets/CommentList";

const GarbageCollectionPointComments = () => {
    const params = useParams()
    const [garbageCollectionPoint, setGarbageCollectionPoint] = useState(null)
    const [comments, setComments] = useState([])
    const user = useSelector(state => state.user.user)
    const [fetchGarbageCollectionPointById, isLoading] = useFetching(async (token, id) => {
        const responseGarbageCollectionPoint = await PostsService.getGarbageCollectionPointById(token, id)
        const responseComments = await PostsService.getCommentsByGarbageCollectionPointId(token, id)
        setGarbageCollectionPoint(responseGarbageCollectionPoint.data)
        setComments(responseComments.data)
    })

    useEffect(() => {
        fetchGarbageCollectionPointById(user.token, params.id)
    }, [])

    const updateComments = () => {
        fetchGarbageCollectionPointById(user.token, params.id)
    }

    return (
        <div>
            {isLoading
                ? <Loader/>
                : <CommentList
                    comments={comments}
                    garbageCollectionPoint={garbageCollectionPoint}
                    updateComments ={updateComments}
                />
            }
        </div>
    );
};

export default GarbageCollectionPointComments;