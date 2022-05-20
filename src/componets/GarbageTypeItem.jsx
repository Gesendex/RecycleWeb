import React from 'react';
import classes from "./styles/GarbageTypeItem.module.css";
import MyImage from "./UI/MyImage/MyImage";

const GarbageTypeItem = (props) => {
    return (
        <div className={classes.garbageType}>
            <div>
                <h3 className={classes.garbageType_title}>{props.garbageType.type}</h3>
                <MyImage data={props.garbageType.mainImage} className={classes.garbageType_content_image}/>
                <div className={classes.garbageType_content}>
                    {props.garbageType.description}
                </div>
            </div>
        </div>
    );
};

export default GarbageTypeItem;