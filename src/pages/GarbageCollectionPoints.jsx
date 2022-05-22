import React, {useEffect, useState} from 'react';
import {useSortByGarbageTypeIdAndCompanyId} from "../componets/hooks/useSearchedAndSortedItems";
import {useFetching} from "../componets/hooks/useFetching";
import PostsService from "../API/PostsService";
import Loader from "../componets/UI/Loader/Loader";
import {useSelector} from "react-redux";
import GarbageCollectionPointList from "../componets/GarbageCollectionPointList";
import MyModal from "../componets/UI/MyModal/MyModal";
import CommentList from "../componets/CommentList";

function GarbageCollectionPoints() {
    const [garbageCollectionPoint, setGarbageCollectionPoint] = useState([]);
    const [commentGarbageCollectionPoint, setCommentGarbageCollectionPoint] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: '', address: '', companyId: 0, garbageTypeId: 0})
    const [modal, setModal] = useState(false);
    const user = useSelector(state => state.user.user)
    const filteredByGarbageTypeGarbageCollectionPoints = useSortByGarbageTypeIdAndCompanyId(
        garbageCollectionPoint,
        'description',
        filter
    )

    const [fetchGarbageCollectionPoint, isGarbageCollectionPointLoading] = useFetching(async (token) => {
        const responsePoints = await PostsService.getGarbageCollectionPoint(token)
        const responseCompanies = await PostsService.getCompanies(token)
        setGarbageCollectionPoint([...garbageCollectionPoint, ...responsePoints.data])
        setCompanies([...companies, ...responseCompanies.data])
    })

    const [fetchComments, isCommentsLoading] = useFetching(async (token, id) => {
        const responseComments = await PostsService.getCommentsByGarbageCollectionPointId(token, id)

        setComments([responseComments.data])
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
                <div>
                    <h1 style={{marginTop: 40}}>Комментарии</h1>
                    <CommentList
                        isLoading={isCommentsLoading}
                        comments={comments}
                        garbageCollectionPoint={commentGarbageCollectionPoint}
                    />
                </div>
            </MyModal>

            {
                isGarbageCollectionPointLoading
                    ?
                    <Loader/>
                    :
                    <GarbageCollectionPointList
                        garbageCollectionPoints={filteredByGarbageTypeGarbageCollectionPoints}
                        title='Точки раздельного сбора мусора'
                        filter={filter}
                        setFilter={setFilter}
                        companies={companies}
                    />
            }
        </div>
    );
}

export default GarbageCollectionPoints;