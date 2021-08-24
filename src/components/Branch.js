import MiniButton from "./UI/Form/MiniButton";
import SubeImage from "../assets/subeimg.png";
import classes from "./Branch.module.css";
import {useHistory} from "react-router-dom";

const Branch = props => {
    const history = useHistory();
    const branch = props.item;

    let showButtons = true;
    if (+props.buttons === 0) {
        showButtons = false;
    }

    const navigationHandler = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${branch.coordinateX},${branch.coordinateY}`, '_blank', 'noopener,noreferrer')
    }

    const ticketHandler = () => {
        history.push({
            pathname: "/sira",
            search: "?id=" + branch.code,
        });
    }

    return (
        <div className={`${classes.branch} ${props.className}`}>
            <img src={SubeImage} alt={branch.name}/>
            <span className={classes.title}>{branch.name}</span>
            <span className={classes.address}>{branch.address}</span>
            <span className={classes.queue}>Sıra: {branch.density / 60} dakika</span>
            <span className={classes.distance}>{branch.distance} m</span>

            {showButtons &&
            <MiniButton className={classes.navigation} onClick={navigationHandler} text="Yol Tarifi"/>}
            {showButtons && <MiniButton className={classes.ticket} onClick={ticketHandler} text="Sıra Al"/>}
        </div>
    )
}



export default Branch;