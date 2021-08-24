import classes from "./MiniButton.module.css";

const MiniButton = (props) => {
    return <button onClick={props.onClick} className={`${classes.button} ${props.className}`}>
        <span>{props.text}</span>
    </button>
}

export default MiniButton;
