import classes from "./NormalButton.module.css";

const NormalButton = (props) => {
    return <button onClick={props.onClick} className={`${classes.button} ${props.className}`}>
        <span>{props.text}</span>
    </button>
}

export default NormalButton;
