//import classes from "./Layout.module.css";
import {Fragment} from "react";
import Header from "../UI/Header/Header";

const Layout = (props) => {

    return (
        <Fragment>
            <Header/>
            <main>{props.children}</main>
        </Fragment>
    );

}

export default Layout;