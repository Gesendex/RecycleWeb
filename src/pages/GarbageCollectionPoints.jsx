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
import {useSelector} from "react-redux";
import GarbageCollectionPointList from "../componets/GarbageCollectionPointList";

function GarbageCollectionPoints() {
    const [garbageCollectionPoint, setGarbageCollectionPoint] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const user = useSelector(state => state.user.user)
    const searchedAndSortedGarbageCollectionPoints = useSearchedAndSortedItems(garbageCollectionPoint, filter.sort, filter.query, 'description');
    const [fetchGarbageCollectionPoint, isGarbageCollectionPointLoading, postError] = useFetching(async (token) => {
        const response = await PostsService.getGarbageCollectionPoint(token)
        setGarbageCollectionPoint([...garbageCollectionPoint, ...response.data])
    })

    useEffect(() => {
        fetchGarbageCollectionPoint(user.token)
    }, [])

    const createGarbageCollectionPoint = (garbageCollectionPoint) => {
        setGarbageCollectionPoint([...garbageCollectionPoint, garbageCollectionPoint])
        setModal(false)
    }

    const removeGarbageCollectionPoint = (garbageCollectionPoint) => {
        setGarbageCollectionPoint(garbageCollectionPoint.filter(p => p.id !== garbageCollectionPoint.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 10}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm onPostCreate={createGarbageCollectionPoint}/>
            </MyModal>
            {
                isGarbageCollectionPointLoading
                    ?
                    <Loader/>
                    :
                    <GarbageCollectionPointList
                        remove={removeGarbageCollectionPoint}
                        garbageCollectionPoint={searchedAndSortedGarbageCollectionPoints}
                        title='Посты про языки программирования'
                    />
            }
        </div>
    );
}

export default GarbageCollectionPoints;