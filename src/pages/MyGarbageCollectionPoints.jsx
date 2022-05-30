import React, {useEffect, useState} from 'react';
import {useFetching} from "../componets/hooks/useFetching";
import PostsService from "../API/PostsService";
import Loader from "../componets/UI/Loader/Loader";
import {useSelector} from "react-redux";
import MyModal from "../componets/UI/MyModal/MyModal";
import MyGarbageCollectionPointList from "../componets/MyGarbageCollectionPointList";
import CreateGcpForm from "../componets/CreateGcpForm";

function MyGarbageCollectionPoints() {
    const [garbageCollectionPoint, setGarbageCollectionPoint] = useState([]);
    const [createdGarbageCollectionPoint, setCreatedGarbageCollectionPoint] = useState({
        street: '',
        building: '',
        idCompany: 0,
        image: [],
        description: '',
        garbageTypeIds: [],
    })
    const [modalCreatePoint, setModalCreatePoint] = useState(false);
    const user = useSelector(state => state.user.user)
    const [fetchGarbageCollectionPoint, isGarbageCollectionPointLoading] = useFetching(async (token, userId) => {
        const responsePoints = await PostsService.getGarbageCollectionPointByClientId(token, userId)
        setGarbageCollectionPoint([...garbageCollectionPoint, ...responsePoints.data])
    })

    useEffect(() => {
        fetchGarbageCollectionPoint(user.token, user.id)
    }, [])

    const onCreate = async () => {
        setModalCreatePoint(true);
        fetchGarbageCollectionPoint(user.token, user.id)
    }

    const onDelete = async (id) => {
        const response = await PostsService.deleteGarbageCollectionPoint(user.token, id)

        if(response.status === 200)
        {
            setGarbageCollectionPoint(garbageCollectionPoint.filter(item => item.id !== id))
        }
    }

    const openCreateModal = (e) => {
        e.preventDefault()
        setModalCreatePoint(true);
    }

    return (
        <div className="App">
            <MyModal visible={modalCreatePoint} setVisible={setModalCreatePoint}>
                <CreateGcpForm
                    createdGarbageCollectionPoint={createdGarbageCollectionPoint}
                    setCreatedGarbageCollectionPoint={setCreatedGarbageCollectionPoint}
                    onCreate={onCreate}
                />
            </MyModal>

            {
                isGarbageCollectionPointLoading
                    ?
                    <Loader/>
                    :
                    <MyGarbageCollectionPointList
                        garbageCollectionPoints={garbageCollectionPoint}
                        title='Точки раздельного сбора мусора'
                        openCreateModal={openCreateModal}
                        onDelete={onDelete}
                    />
            }
        </div>
    );
}

export default MyGarbageCollectionPoints;