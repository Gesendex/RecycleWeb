import CommentItem from "./CommentItem";
import {GetTitle} from "../helpers/garbageCollectionPoint";
import Loader from "./UI/Loader/Loader";
import classes from "./styles/CommentList.module.css";
import React from "react";

const CommentList = ({garbageCollectionPoint, comments, isLoading}) => {

    if (isLoading) {
        return (<Loader/>)
    }

    if (!comments || !garbageCollectionPoint){
        return (<div/>)
    }

    return (
        <div className={classes.comment_list}>
            <div className="list_title_container">
                <div className="list_title">Комментарии</div>
            </div>
            <h2 className={classes.comment_list_title}>{GetTitle(garbageCollectionPoint)}</h2>
            <div>
                {comments.map((com, index) => <CommentItem comment={com} key={com.id} number={index + 1}/>)}
            </div>
        </div>
    );
};

export default CommentList;