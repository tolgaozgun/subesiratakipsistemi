import classes from "./Text.module.css";


const Text = props => {
    return (
        <span className={`${classes.text} ${props.className}`} onClick={props.onClick}>
            {props.children}
        </span>
    );
}

export default Text;