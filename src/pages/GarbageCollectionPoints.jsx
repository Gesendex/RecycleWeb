import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSearchedAndSortedItems, useSortByGarbageType} from "../componets/hooks/useSearchedAndSortedItems";
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
    const [garbageType, setGarbageType] = useState(0);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const user = useSelector(state => state.user.user)
    const filtredByGarbageTypeGarbageCollectionPoints = useSortByGarbageType(garbageCollectionPoint, filter.sort, filter.query, 'description', garbageType)

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

    const setGarbageTypeSort = (value) => {
        setGarbageType(value)
    }

    return (
        <div className="App">
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm onPostCreate={createGarbageCollectionPoint}/>
            </MyModal>
            <div>
                <MySelect
                    value={garbageType}
                    onChange={value => setGarbageTypeSort(value)}
                    defaultValue='Типы принимаемого мусора'
                    options={[
                        {value: 0, name: 'Все'},
                        {value: 1, name: 'Стекло'},
                        {value: 2, name: 'Пластик'},
                        {value: 3, name: 'Макулатура'},
                        {value: 4, name: 'Металл'},
                        {value: 5, name: 'PAC'},
                        {value: 6, name: 'Опасные отходы'}
                    ]}
                />
            </div>

            {
                isGarbageCollectionPointLoading
                    ?
                    <Loader/>
                    :
                    <GarbageCollectionPointList
                        remove={removeGarbageCollectionPoint}
                        garbageCollectionPoint={filtredByGarbageTypeGarbageCollectionPoints}
                        title='Точки раздельного сбора мусора'
                    />
            }
        </div>
    );
}

export default GarbageCollectionPoints;