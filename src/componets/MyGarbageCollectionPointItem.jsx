import React, {useEffect, useState} from 'react';
import MyImage from "./UI/MyImage/MyImage";
import classes from "./styles/GarbageCollectionPointItem.module.css";
import {getBase64, GetTitle} from "../helpers/garbageCollectionPoint";
import NavbarButton from "./UI/button/NavbarButton";
import linkClass from "./UI/button/NavbarButton.module.css";
import mock from "../assets/Mock.png";

const MyGarbageCollectionPointItem = ({garbageCollectionPoint, editPoint, onDelete}) => {


    return (
        <div className={classes.garbageCollectionPoint}>
            <h3 className={classes.garbageCollectionPoint_title}>{GetTitle(garbageCollectionPoint)}</h3>

            <div className={classes.garbageCollectionPoint_content}>
                <div className={classes.garbageCollectionPoint_content_left_bar}>
                    <MyImage data={garbageCollectionPoint.image ? garbageCollectionPoint.image : mock.split('base64,')[1]}
                             className={classes.garbageCollectionPoint_content_image}/>

                    <div className={classes.garbageCollectionPoint_btns}>
                        <NavbarButton
                            className={linkClass.navbar_btn_exit}
                            onClick={() => editPoint(garbageCollectionPoint)}
                        >
                            Редактировать
                        </NavbarButton>
                        <NavbarButton
                            className={linkClass.navbar_btn_exit}
                            onClick={() => onDelete(garbageCollectionPoint.id)}
                        >
                            Удалить
                        </NavbarButton>
                    </div>
                </div>

                <div className={classes.garbageCollectionPoint_content_text}>
                    {garbageCollectionPoint.description}
                </div>
            </div>
        </div>
    );
};

export default MyGarbageCollectionPointItem;