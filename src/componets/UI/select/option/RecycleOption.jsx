import React from 'react';
import classes from "./RecycleOption.module.css";

const RecycleOption = ({children, disabled, ...props}) => {
    return (
        <option {...props} disabled={disabled} className={classes.option} >
            {children}
        </option>
    );
};

export default RecycleOption;