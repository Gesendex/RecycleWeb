import React, {useEffect, useState} from 'react';
import {useFetching} from "../componets/hooks/useFetching";
import PostsService from "../API/PostsService";
import Loader from "../componets/UI/Loader/Loader";
import {useSelector} from "react-redux";
import MyModal from "../componets/UI/MyModal/MyModal";
import MyGarbageCollectionPointList from "../componets/MyGarbageCollectionPointList";
import CreateGcpForm from "../componets/CreateGcpForm";
import EditGcpForm from "../componets/EditGcpForm";

function MyGarbageCollectionPoints() {
    const [garbageCollectionPoint, setGarbageCollectionPoint] = useState([]);
    const [createdGarbageCollectionPoint, setCreatedGarbageCollectionPoint] = useState({
        street: '',
        building: '',
        idCompany: 0,
        image: null,
        description: '',
        garbageTypeIds: []
    })
    const [editedGarbageCollectionPoint, setEditedGarbageCollectionPoint] = useState({
        street: '',
        building: '',
        idCompany: 0,
        image: null,
        description: '',
        garbageTypeIds: []
    })
    const [modalCreatePoint, setModalCreatePoint] = useState(false);
    const [modalEditPoint, setModalEditPoint] = useState(false);
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
        await fetchGarbageCollectionPoint(user.token, user.id)
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

    const openEditModal= (e) => {
        e.preventDefault()
        setModalEditPoint(true);
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
            <MyModal visible={modalEditPoint} setVisible={setModalEditPoint}>
                <EditGcpForm
                    editedGarbageCollectionPoint={editedGarbageCollectionPoint}
                    setEditedGarbageCollectionPoint={setEditedGarbageCollectionPoint}
                    onEdit={() => fetchGarbageCollectionPoint(user.token, user.id)}
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
                        openEditModal={openEditModal}
                        onDelete={onDelete}
                    />
            }
        </div>
    );
}

export default MyGarbageCollectionPoints;