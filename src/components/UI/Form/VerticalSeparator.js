import classes from "./Separator.module.css";

const VerticalSeparator = () => {
    return (
        <svg className={classes.svg} viewBox="0 0 3 36">
            <path className={classes.path} d="M 0 0 L 0 36">
            </path>
        </svg>
    );
}

export default VerticalSeparator;