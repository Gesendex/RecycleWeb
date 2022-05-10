import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";
import MyImage from "./UI/MyImage/MyImage";
import classes from "./styles/GarbageCollectionPointItem.module.css";

const GarbageCollectionPointItem = (props) => {
    const router = useNavigate()
    return (
        <div className={classes.garbageCollectionPoint}>
            <div className={classes.garbageCollectionPoint_content}>
                <strong>
                    {props.number}. Компания: {props.garbageCollectionPoint.company.name},
                    Адрес: {[props.garbageCollectionPoint.street, props.garbageCollectionPoint.building].join(', ')}
                </strong>
                <MyImage data={props.garbageCollectionPoint.image} className={classes.garbageCollectionPoint_content_image}/>
                <div>
                    {props.garbageCollectionPoint.description}
                </div>
            </div>
            <div className={classes.garbageCollectionPoint_btns}>
                <MyButton onClick={() => router(`/posts/${props.garbageCollectionPoint.id}`)}>
                    Открыть
                </MyButton>
                <MyButton onClick={() => props.remove(props.garbageCollectionPoint)}>
                    Удалить
                </MyButton>
            </div>
        </div>
    );
};

export default GarbageCollectionPointItem;