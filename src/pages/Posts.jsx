import React, {useEffect, useRef, useState} from 'react';
import {useSearchedAndSortedItems} from "../componets/hooks/useSearchedAndSortedItems";
import {useFetching} from "../componets/hooks/useFetching";
import PostsService from "../API/PostsService";
import {getPageCount} from "../helpers/pages";
import MyModal from "../componets/UI/MyModal/MyModal";
import PostForm from "../componets/PostForm";
import PostFilter from "../componets/PostFilter";
import Loader from "../componets/UI/Loader/Loader";
import PostList from "../componets/PostList";
import Pagination from "../componets/UI/pagination/Pagination";
import MyButton from "../componets/UI/button/MyButton";
import {useObserver} from "../componets/hooks/useObserver";
import MySelect from "../componets/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const searchedAndSortedPosts = useSearchedAndSortedItems(posts, filter.sort, filter.query, 'title');
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef()
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostsService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () =>setPage(page +1))

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (post) => {
        setPosts([...posts, post])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 10}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm onPostCreate={createPost}/>
            </MyModal>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Кол-во элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Все'}
                ]}
            />
            <PostList
                remove={removePost}
                posts={searchedAndSortedPosts}
                title='Посты про языки программирования'
            />
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>

            <Pagination
                changePage={changePage}
                page={page}
                totalPages={totalPages}
            />

        </div>
    );
}

export default Posts;