import CommentItem from "./CommentItem";
import {GetTitle} from "../helpers/garbageCollectionPoint";
import Loader from "./UI/Loader/Loader";
import classes from "./styles/CommentList.module.css";
import navbarclasses from "../componets/UI/button/NavbarButton.module.css";
import React, {useState} from "react";
import MyModal from "./UI/MyModal/MyModal";
import NavbarButton from "./UI/button/NavbarButton";
import {useSelector} from "react-redux";
import PostsService from "../API/PostsService";

const CommentList = ({garbageCollectionPoint, comments, isLoading, updateComments}) => {

    const user = useSelector(state => state.user.user)
    const [isModal, setIsModal] = useState(false)
    const [text, setText] = useState('')

    const onCreateComment = (e) => {
        e.preventDefault()
        if (!user) {
            return;
        }

        PostsService.writeComment(user, text, garbageCollectionPoint.id);
        updateComments();
        setIsModal(false)
    }

    function input(e) {
        e.preventDefault()
        e.target.style.height = "20px";
        e.target.style.height = (e.target.scrollHeight + 1) + "px";
        setText(e.target.value)
    }

    if (isLoading) {
        return (<Loader/>)
    }

    if (!comments || !garbageCollectionPoint) {
        return (<div/>)
    }

    return (
        <div className={classes.commentsPage_main}>
            <div className={classes.comment_list}>
                <div className="list_title_container">
                    <div className="list_title">Комментарии</div>
                </div>
                <h2 className={classes.comment_list_title}>{GetTitle(garbageCollectionPoint)}</h2>
                <div className={classes.center}>
                    <NavbarButton className={navbarclasses.navbar_btn_exit} onClick={() => setIsModal(true)}>Оставить
                        комментарий</NavbarButton>
                </div>
                <div>
                    {comments.map((com, index) => <CommentItem comment={com} key={com.id} number={index + 1}/>)}
                </div>
            </div>
            <MyModal visible={isModal} setVisible={setIsModal}>
                <form>
                    <textarea rows={1} className={classes.auto_height} defaultValue={text} onInput={(e) => input(e)}/>
                    <div className={classes.center}>
                        <NavbarButton className={navbarclasses.navbar_btn_exit} onClick={onCreateComment}>Оставить
                            комментарий</NavbarButton>
                    </div>
                </form>
            </MyModal>
        </div>
    );
};

export default CommentList;