import React from 'react';
import classes from "./styles/CommentItem.module.css";

const CommentItem = (props) => {
    return (
        <div className={classes.comment_container}>
            <h3>{props.comment.client.name}</h3>
            <div className={classes.comment_container_item}>{props.comment.text}</div>
        </div>
    );
};

export default CommentItem;