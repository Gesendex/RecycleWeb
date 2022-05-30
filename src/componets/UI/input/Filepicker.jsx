import React from 'react';
import classes from "./Filepicker.module.css";

const Filepicker = ({name, id, onChange}) => {
    return (
        <div className={classes.input__wrapper}>
            <input name={name} type="file" id={id} className={classes.input__file} onChange={onChange} accept="image/*"/>
            <label htmlFor={id}>Выберите изображение</label>
        </div>
    );
};

export default Filepicker;