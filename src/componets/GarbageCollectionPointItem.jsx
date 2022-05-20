import React from 'react';
import MyButton from "./UI/button/MyButton";
import MyImage from "./UI/MyImage/MyImage";
import classes from "./styles/GarbageCollectionPointItem.module.css";
import {GetTitle} from "../helpers/garbageCollectionPoint";
import {useNavigate} from "react-router-dom";

const GarbageCollectionPointItem = ({garbageCollectionPoint}) => {
    const router = useNavigate()

    return (
        <div className={classes.garbageCollectionPoint}>
            <h3>{GetTitle(garbageCollectionPoint)}</h3>

            <div className={classes.garbageCollectionPoint_content}>
                <div className={classes.garbageCollectionPoint_content_left_bar}>
                    <MyImage data={garbageCollectionPoint.image}
                             className={classes.garbageCollectionPoint_content_image}/>

                    <div className={classes.garbageCollectionPoint_btns}>
                        <MyButton
                            onClick={() => router(`/garbagecollectionpoints/${garbageCollectionPoint.id}/comments`)}>
                            Комментарии
                        </MyButton>
                    </div>
                </div>

                <div className={classes.garbageCollectionPoint_content_text}>
                    {garbageCollectionPoint.description}
                </div>
            </div>
        </div>
    );
};

export default GarbageCollectionPointItem;