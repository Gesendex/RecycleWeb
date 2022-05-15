import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    useSearchedAndSortedItems, useSearchedByAddressAndSorted,
    useSortByGarbageTypeIdAndCompanyId
} from "../componets/hooks/useSearchedAndSortedItems";
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
import MyInput from "../componets/UI/input/MyInput";
import GarbageCollectionPointsFilter from "../componets/GarbageCollectionPointsFilter";

function GarbageCollectionPoints() {
    const [garbageCollectionPoint, setGarbageCollectionPoint] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: '', address: '', companyId: 0, garbageTypeId: 0})
    const [modal, setModal] = useState(false);
    const user = useSelector(state => state.user.user)
    const filteredByGarbageTypeGarbageCollectionPoints = useSortByGarbageTypeIdAndCompanyId(
        garbageCollectionPoint,
        'description',
        filter
    )

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

    return (
        <div className="App">
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm onPostCreate={createGarbageCollectionPoint}/>
            </MyModal>
            <GarbageCollectionPointsFilter
                filter={filter}
                setFilter={setFilter}
                companies={companies}
            />

            {
                isGarbageCollectionPointLoading
                    ?
                    <Loader/>
                    :
                    <GarbageCollectionPointList
                        garbageCollectionPoints={filteredByGarbageTypeGarbageCollectionPoints}
                        title='Точки раздельного сбора мусора'
                    />
            }
        </div>
    );
}

export default GarbageCollectionPoints;