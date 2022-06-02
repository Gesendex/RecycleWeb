import React, {useEffect, useState} from 'react';
import modalclass from "../pages/style/MyGarbageCollectionPointComment.module.css";
import LoginInput from "./UI/input/LoginInput";
import Filepicker from "./UI/input/Filepicker";
import checkbox from "./UI/input/CheckBox.module.css";
import Chekbox from "./UI/input/Chekbox";
import classes from "./styles/CommentList.module.css";
import NavbarButton from "./UI/button/NavbarButton";
import navbarclasses from "./UI/button/NavbarButton.module.css";
import mock from "../assets/Mock.png";
import {useFetching} from "./hooks/useFetching";
import PostsService from "../API/PostsService";
import {useSelector} from "react-redux";
import {getBase64} from "../helpers/garbageCollectionPoint";
import MyImage from "./UI/MyImage/MyImage";

const CreateGcpForm = ({
                           setCreatedGarbageCollectionPoint,
                           createdGarbageCollectionPoint,
                           onCreate
                       }) => {

    const user = useSelector(state => state.user.user)
    const [garbageTypes, setGarbageTypes] = useState([]);
    const [fetchGarbageTypes, isGarbageTypesLoading] = useFetching(async (token) => {
        const response = await PostsService.getTypesOfGarbage(token)
        setGarbageTypes(response.data)
    })

    const onChange = async event => {
        const img = event.target.files[0]
        const base64 = await getBase64(img)
        const imgData = base64.split('base64,')[1]

        setCreatedGarbageCollectionPoint({...createdGarbageCollectionPoint, image: imgData})
    }

    useEffect(() => {
        fetchGarbageTypes(user.token)
    }, [])

    const resetInputs = () => {
        setCreatedGarbageCollectionPoint({
            street: '',
            building: '',
            idCompany: 0,
            image: null,
            description: '',
            garbageTypeIds: [],
        })
    }

    const resetCheckBox = () => {
        document.getElementsByName('garbageTypeChB').forEach(el => {
            el.checked = false
        })
    }

    const selectType = (e) => {
        const id = e.target.value

        if (e.target.checked) {
            createdGarbageCollectionPoint.garbageTypeIds.push(id)
        } else {
            createdGarbageCollectionPoint.garbageTypeIds.splice(createdGarbageCollectionPoint.garbageTypeIds.indexOf(id), 1)
        }

    }

    const onCreatePoint = async e => {
        e.preventDefault()


        let payload = {
            street: createdGarbageCollectionPoint.street,
            building: createdGarbageCollectionPoint.building,
            idCompany: 0,
            image: createdGarbageCollectionPoint.image,
            description: createdGarbageCollectionPoint.description,
            garbageTypeIds: createdGarbageCollectionPoint.garbageTypeIds
        }

        const response = await PostsService.createGarbageCollectionPoint(user, payload)

        if (response.status !== 200) {
            alert('Ошибка при создании, попробуйте позже')
            return
        }

        alert('Точка успешно создалась')
        resetCheckBox()
        resetInputs()

        onCreate()
    }

    function inputDescription(e) {
        e.preventDefault()
        e.target.style.height = "20px";
        e.target.style.height = (e.target.scrollHeight + 1) + "px";
        setCreatedGarbageCollectionPoint({...createdGarbageCollectionPoint, description: e.target.value})
    }

    return (
        <form>
            <div>
                <div className={modalclass.modal_top_container}>
                    <div className={modalclass.input_bar}>
                        <LoginInput placeholder="Улица..." value={createdGarbageCollectionPoint.street}
                                    onInput={(e) => setCreatedGarbageCollectionPoint({
                                        ...createdGarbageCollectionPoint,
                                        street: e.target.value
                                    })}/>
                        <LoginInput placeholder="Здание..." value={createdGarbageCollectionPoint.building}
                                    onInput={(e) => setCreatedGarbageCollectionPoint({
                                        ...createdGarbageCollectionPoint,
                                        building: e.target.value
                                    })}/>
                    </div>
                    <div className={modalclass.image_bar}>
                        <div className={modalclass.image_container}>
                            <MyImage id='gcpImg' className={modalclass.image}
                                     data={createdGarbageCollectionPoint.image ? createdGarbageCollectionPoint.image : mock.split('base64,')[1]}
                                     alt="Заглушка"/>
                        </div>

                        <Filepicker id='fpid' name='fp' onChange={onChange}/>
                    </div>
                </div>
                <textarea
                    rows={1}
                    className="point_textarea"
                    value={createdGarbageCollectionPoint.description}
                    placeholder='Описание...'
                    onInput={(e) => inputDescription(e)}
                />
                <div className={checkbox.container}>
                    {
                        garbageTypes.map(type => <Chekbox key={type.id} id={type.id + 'type'}
                                                          name="garbageTypeChB"
                                                          text={type.type}
                                                          value={type.id} onChange={selectType}/>)
                    }
                </div>

            </div>
            <div className={classes.center}>
                <NavbarButton
                    className={navbarclasses.navbar_btn_exit}
                    onClick={onCreatePoint}>
                    Создать точку
                </NavbarButton>
            </div>
        </form>
    );
};

export default CreateGcpForm;