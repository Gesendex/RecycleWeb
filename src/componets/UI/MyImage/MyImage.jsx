import React from 'react';
import classes from "./MyImage.module.css";

const MyImage = (props) => {
    return (
        <div >
            <img className={classes.image} src={`data:image/png;base64,${props.data}`} {...props} />
        </div>

    );
};

export default MyImage;