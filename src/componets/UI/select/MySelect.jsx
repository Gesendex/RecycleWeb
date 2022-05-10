import React from 'react';
import classes from "./MySelect.module.css";
import MyOption from "./option/MyOption";

const MySelect = ({options, defaultValue, value, onChange}) => {

    return (
        <div>
            <select className={classes.slct} value={value} onChange={event => onChange(event.target.value)}>
                <option disabled value=''>{defaultValue}</option>
                {options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>

    );
};

export default MySelect;