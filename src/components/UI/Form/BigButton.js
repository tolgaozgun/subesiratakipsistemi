import classes from "./BigButton.module.css";

const BigButton = (props) => {

    let isDisabled = false;
    if(props.disabled){
        isDisabled = true;
    }
    return <button disabled={isDisabled} onClick={props.onClick} className={`${classes.button} ${props.className}`}>
        <span>{props.text}</span>
    </button>
}

export default BigButton;
