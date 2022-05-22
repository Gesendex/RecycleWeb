import React, {useEffect, useState} from 'react';
import {useFetching} from "../componets/hooks/useFetching";
import PostsService from "../API/PostsService";
import Loader from "../componets/UI/Loader/Loader";
import {useSelector} from "react-redux";
import MyModal from "../componets/UI/MyModal/MyModal";
import MyGarbageCollectionPointList from "../componets/MyGarbageCollectionPointList";
import classes from "../componets/styles/CommentList.module.css";
import NavbarButton from "../componets/UI/button/NavbarButton";
import navbarclasses from "../componets/UI/button/NavbarButton.module.css";
import checkbox from "../componets/UI/input/CheckBox.module.css";
import LoginInput from "../componets/UI/input/LoginInput";
import Chekbox from "../componets/UI/input/Chekbox";

function MyGarbageCollectionPoints() {
    const [garbageCollectionPoint, setGarbageCollectionPoint] = useState([]);
    const [garbageTypes, setGarbageTypes] = useState([]);
    const [createdGarbageCollectionPoint, setCreatedGarbageCollectionPoint] = useState({
        street: '',
        building: '',
        idCompany: 0,
        image: '',
        description: '',
        garbageTypeIds: [],
    })
    const [modalCreatePoint, setModalCreatePoint] = useState(false);
    const user = useSelector(state => state.user.user)

    const [fetchGarbageTypes, isGarbageTypesLoading] = useFetching(async (token) => {
        const response = await PostsService.getTypesOfGarbage(token)
        setGarbageTypes(response.data)
    })
    const [fetchGarbageCollectionPoint, isGarbageCollectionPointLoading] = useFetching(async (token, userId) => {
        const responsePoints = await PostsService.getGarbageCollectionPointByClientId(token, userId)
        setGarbageCollectionPoint([...garbageCollectionPoint, ...responsePoints.data])
    })

    useEffect(() => {
        fetchGarbageTypes(user.token)
    }, [])

    useEffect(() => {
        fetchGarbageCollectionPoint(user.token, user.id)
    }, [])

    const selectType = (e) => {
        const id = e.target.value

        if (e.target.checked) {
            createdGarbageCollectionPoint.garbageTypeIds.push(id)
        } else {
            createdGarbageCollectionPoint.garbageTypeIds.splice(createdGarbageCollectionPoint.garbageTypeIds.indexOf(id), 1)
        }

    }

    const createGarbageCollectionPoint = (e) => {
        e.preventDefault()

        const payload = {
            street: createdGarbageCollectionPoint.street,
            building: createdGarbageCollectionPoint.building,
            idCompany: createdGarbageCollectionPoint.idCompany,
            image: createdGarbageCollectionPoint.image,
            description: createdGarbageCollectionPoint.description,
            garbageTypeIds: createdGarbageCollectionPoint.garbageTypeIds
        }

        console.log(payload)
        setModalCreatePoint(false)
        resetCheckBox()
        createdGarbageCollectionPoint.garbageTypeIds = []
    }

    const resetCheckBox = () => {
        document.getElementsByName('garbageTypeChB').forEach(el => {
            el.checked = false
        })

        setModalCreatePoint(true);
    }

    const openCreateModal = (e) => {
        e.preventDefault()

        setModalCreatePoint(true);
    }

    function inputDescription(e) {
        e.preventDefault()
        e.target.style.height = "20px";
        e.target.style.height = (e.target.scrollHeight + 1) + "px";
        setCreatedGarbageCollectionPoint({...createdGarbageCollectionPoint, description: e.target.value})
    }

    return (
        <div className="App">
            <MyModal visible={modalCreatePoint} setVisible={setModalCreatePoint}>
                <form>
                    <div>
                        <LoginInput placeholder="Улица..." onInput={(e) => setCreatedGarbageCollectionPoint({
                            ...createdGarbageCollectionPoint,
                            street: e.target.value
                        })}/>
                        <LoginInput placeholder="Здание..." onInput={(e) => setCreatedGarbageCollectionPoint({
                            ...createdGarbageCollectionPoint,
                            building: e.target.value
                        })}/>
                        <textarea
                            rows={1}
                            className="point_textarea"
                            defaultValue={createdGarbageCollectionPoint.description} placeholder='Описание...'
                            onInput={(e) => inputDescription(e)}
                        />
                        <div className={checkbox.container}>
                            {
                                garbageTypes.map(type => <Chekbox id={type.id + 'type'} name="garbageTypeChB"
                                                                  text={type.type}
                                                                  value={type.id} onChange={selectType}/>)
                            }
                        </div>

                    </div>
                    <div className={classes.center}>
                        <NavbarButton
                            className={navbarclasses.navbar_btn_exit}
                            onClick={createGarbageCollectionPoint}>
                            Создать точку
                        </NavbarButton>
                    </div>
                </form>
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
                    />
            }
        </div>
    );
}

export default MyGarbageCollectionPoints;