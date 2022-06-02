import React from 'react';
import MyImage from "./UI/MyImage/MyImage";
import classes from "./styles/GarbageCollectionPointItem.module.css";
import {GetTitle} from "../helpers/garbageCollectionPoint";
import {useNavigate} from "react-router-dom";
import NavbarButton from "./UI/button/NavbarButton";
import linkClass from "./UI/button/NavbarButton.module.css";
import mock from "../assets/Mock.png";

const GarbageCollectionPointItem = ({garbageCollectionPoint}) => {
    const router = useNavigate()

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
                            onClick={() => router(`/garbagecollectionpoints/${garbageCollectionPoint.id}/comments`)}>
                            Комментарии
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

export default GarbageCollectionPointItem;