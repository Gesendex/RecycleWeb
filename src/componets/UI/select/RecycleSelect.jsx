import React from 'react';
import classes from "./RecycleSelect.module.css";
import RecycleOption from "./option/RecycleOption";

const RecycleSelect = ({options, defaultValue, value, onChange}) => {

    return (
        <div className={classes.select_container}>
            <select className={classes.select} value={value} onChange={event => onChange(event.target.value)}>
                <RecycleOption disabled={true} value='' >
                    {defaultValue}
                </RecycleOption>
                {options.map(option =>
                    <RecycleOption key={option.value} value={option.value}>
                        {option.name}
                    </RecycleOption>
                )}
            </select>
        </div>

    );
};

export default RecycleSelect;