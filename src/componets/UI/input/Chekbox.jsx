import React from 'react';
import classes from "./CheckBox.module.css";

const Chekbox = ({id, name, value, text, onChange}) => {
    return (
        <div key={id}>
            <input type="checkbox" className={classes.checkbox} onChange={onChange} id={id} name={name} value={value}/>
            <label htmlFor={id}>{text}</label>
        </div>
    );
};

export default Chekbox;