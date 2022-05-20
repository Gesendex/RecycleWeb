import React from 'react';
import classes from "./styles/CommentItem.module.css";
import {getDate, getFullname} from "../helpers/user";

const CommentItem = (props) => {
    return (
        <div className={classes.comment_container} key={props.key}>
            <h3 className={classes.comment_container_title}>Автор: {getFullname(props.comment.client)}  <span className={classes.comment_date}>{getDate(props.comment)}</span> </h3>
            <div className={classes.comment_container_item}>{props.comment.text}</div>
        </div>
    );
};

export default CommentItem;