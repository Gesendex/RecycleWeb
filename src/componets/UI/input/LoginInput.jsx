import React from 'react';
import classes from "./LoginInput.module.css";

const LoginInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.login} {...props} />
    );
});

export default LoginInput;


