import React, {useEffect, useState} from 'react';
import {useSortByGarbageTypeIdAndCompanyId} from "../componets/hooks/useSearchedAndSortedItems";
import {useFetching} from "../componets/hooks/useFetching";
import PostsService from "../API/PostsService";
import Loader from "../componets/UI/Loader/Loader";
import {useSelector} from "react-redux";
import GarbageCollectionPointList from "../componets/GarbageCollectionPointList";
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
            {/*<MyModal visible={modal} setVisible={setModal}>
                <div>
                    <h1 style={{marginTop: 40}}>Комментарии</h1>
                    {isLoading
                        ? <Loader/>
                        : <CommentList
                            comments={comments}
                            garbageCollectionPoint={garbageCollectionPoint}
                        />
                    }
                </div>
            </MyModal>*/}
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