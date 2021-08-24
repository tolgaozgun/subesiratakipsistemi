import classes from './Notification.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const Notification = () => {
    const props = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();
    let specialClasses = '';

    if (!props) {
        return "";
    }

    if (props.status === 'error') {
        specialClasses = classes.error;
    }
    if (props.status === 'success') {
        specialClasses = classes.success;
    }

    const closeHandler = () => {
        dispatch(uiActions.clearNotification());

    }


    const cssClasses = `${classes.notification} ${specialClasses}`;

    return (
        <section className={cssClasses}>
            <div onClick={closeHandler} className={classes.close}>
                <span>X</span>
            </div>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </section>
    );
};

export default Notification;
