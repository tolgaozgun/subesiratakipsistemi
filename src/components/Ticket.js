import BigButton from "./UI/Form/BigButton";
import classes from "./Ticket.module.css";
import {Fragment} from "react";

Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

const Ticket = (props) => {

    let date = new Date(props.ticket.date);
    let formattedDate = [(date.getMonth() + 1).padLeft(),
            date.getDate().padLeft(),
            date.getFullYear()].join('/') + ' ' +
        [date.getHours().padLeft(),
            date.getMinutes().padLeft(),
            date.getSeconds().padLeft()].join(':');

    const noShowHandler = () => {

    }

    const completeHandler = () => {

    }

    const cancelHandler = () => {

    }

    let buttons = "";

    if (props.admin && props.ticket.status_code !== 1) {
        buttons = <Fragment>
            <BigButton className={classes["btn-no-show"]} text="GELMEDİ" onClick={noShowHandler}/>
            <BigButton className={classes["btn-complete"]} text="TAMAMLANDI" onClick={completeHandler}/>
            <BigButton className={classes["btn-cancel"]} text="İPTAL" onClick={cancelHandler}/>
        </Fragment>

    } else {
        if (props.ticket.status_code !== 1) {
            buttons = <Fragment>
                <BigButton className={classes["btn-complete"]} text="TAMAMLANDI" onClick={completeHandler}/>
                <BigButton className={classes["btn-cancel"]} text="İPTAL" onClick={cancelHandler}/>
            </Fragment>
        }
    }

    let actionsResult = "";
    if (props.ticket.actions) {
        let actions = props.ticket.actions;
        actions.map(action => actionsResult += action.label + ", ");
        actionsResult = actionsResult.trim().substring(0, actionsResult.trim().length - 1);
    }


    return (
        <div className={classes.ticket}>
            <span className={classes.customer}>{props.ticket.name}</span>
            <span className={classes["queue-id"]}>Sıra No: {props.ticket.id}</span>
            <span className={classes.actions}>İşlemler: {actionsResult}</span>
            <span className={classes.date}>Sıra Alma Tarihi: {formattedDate}</span>
            <span className={classes.status}>Durum: {props.ticket.status}</span>
            {buttons}
        </div>
    )

}

export default Ticket;