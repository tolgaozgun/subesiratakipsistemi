import React, {Fragment} from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => (
    <Fragment>
        <input ref={ref} className={`${classes.input} ${props.className}`} {...props.input}></input>
    </Fragment>
));


export default Input;