import HeaderLogo from "./HeaderLogo";
import classes from "./Header.module.css";
import {useDispatch, useSelector} from "react-redux";
import NormalButton from "../Form/NormalButton";
import {authActions} from "../../../store/auth-slice";
import {useHistory} from "react-router-dom";

const Header = () => {

    const token = useSelector(state => state.auth.token);
    const name = useSelector(state => state.auth.name);
    const authType = useSelector(state => state.auth.authType);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = () => {
        dispatch(authActions.logout())
        history.push("/");
    }

    const mapRedirectHandler = () => {
        history.push("/harita");
    }

    return (
        <div className={classes.header}>
            <HeaderLogo className={classes.logo}/>
            {token && token.length > 0 && authType === "CUSTOMER" && <span onClick={mapRedirectHandler} className={classes.map}>Harita</span>}
            {token && token.length > 0 && <span className={classes.name}>Merhaba, {name}</span>}
            {token && (token.length > 0) && <NormalButton className={classes.logout} onClick={logoutHandler} text="Çıkış Yap"/>}
        </div>
    )
}

export default Header;