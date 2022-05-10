import React from 'react';
import classes from "./MyOption.module.css";

const MyOption = ({option}) => {
    return (
        <option className={classes.opt} value={option.value}>
            {option.name}
        </option>
    );
};

export default MyOption;