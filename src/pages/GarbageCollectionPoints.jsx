import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSearchedAndSortedItems, useSortByGarbageTypeIdAndCompanyId} from "../componets/hooks/useSearchedAndSortedItems";
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
    const [companies, setCompanies] = useState([]);
    const [garbageType, setGarbageType] = useState(0);
    const [companyId, setCompanyId] = useState(0);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const user = useSelector(state => state.user.user)
    const filteredByGarbageTypeGarbageCollectionPoints = useSortByGarbageTypeIdAndCompanyId(garbageCollectionPoint, filter.sort, filter.query, 'description', garbageType, companyId)

    const [fetchGarbageCollectionPoint, isGarbageCollectionPointLoading, postError] = useFetching(async (token) => {
        const responsePoints = await PostsService.getGarbageCollectionPoint(token)
        const responseCompanies = await PostsService.getCompanies(token)
        setGarbageCollectionPoint([...garbageCollectionPoint, ...responsePoints.data])
        setCompanies([...companies, ...responseCompanies.data])

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

    const setCompanyIdSort = (value) => {
        setCompanyId(value)
    }

    return (
        <div className="App">
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm onPostCreate={createGarbageCollectionPoint}/>
            </MyModal>
            <div className="garbageCollectionPoint_filter">
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
                <MySelect
                    value={companyId}
                    onChange={value => setCompanyIdSort(value)}
                    defaultValue='Компания'
                    options={[{value: 0, name: 'Все'},...companies.map(company => ({value: company.id, name:company.name}))]}
                />
            </div>

            {
                isGarbageCollectionPointLoading
                    ?
                    <Loader/>
                    :
                    <GarbageCollectionPointList
                        remove={removeGarbageCollectionPoint}
                        garbageCollectionPoint={filteredByGarbageTypeGarbageCollectionPoints}
                        title='Точки раздельного сбора мусора'
                    />
            }
        </div>
    );
}

export default GarbageCollectionPoints;