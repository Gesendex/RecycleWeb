import React from 'react';
import MyImage from "./UI/MyImage/MyImage";
import classes from "./styles/GarbageCollectionPointItem.module.css";
import {GetTitle} from "../helpers/garbageCollectionPoint";
import {useNavigate} from "react-router-dom";
import NavbarButton from "./UI/button/NavbarButton";
import linkClass from "./UI/button/NavbarButton.module.css";

const MyGarbageCollectionPointItem = ({garbageCollectionPoint, editPoint, createPoint}) => {

    return (
        <div className={classes.garbageCollectionPoint}>
            <h3 className={classes.garbageCollectionPoint_title}>{GetTitle(garbageCollectionPoint)}</h3>

            <div className={classes.garbageCollectionPoint_content}>
                <div className={classes.garbageCollectionPoint_content_left_bar}>
                    <MyImage data={garbageCollectionPoint.image}
                             className={classes.garbageCollectionPoint_content_image}/>

                    <div className={classes.garbageCollectionPoint_btns}>
                        <NavbarButton
                            className={linkClass.navbar_btn_exit}
                            onClick={() => editPoint(garbageCollectionPoint)}
                        >
                            Редактировать
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