import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({onPostCreate}) => {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e) => {

        e.preventDefault()
        const newPost = {...post, id: Date.now()}
        onPostCreate(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <MyInput value={post.title} type="text" onChange={e => setPost({...post, title: e.target.value})}
                     placeholder="Название поста"/>
            <MyInput value={post.body} type="text" onChange={e => setPost({...post, body: e.target.value})}
                     placeholder="Описание поста"/>
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;