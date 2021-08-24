import classes from "./LoginPage.module.css";
import Text from "../components/UI/Form/Text";
import Input from "../components/UI/Form/Input";
import React, {useRef, useState} from "react";
import VerticalSeparator from "../components/UI/Form/VerticalSeparator";
import BigButton from "../components/UI/Form/BigButton";
import Layout from "../components/Layout/Layout";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {sendLoginData} from "../store/auth-actions";
import {uiActions} from "../store/ui-slice";

const LoginPage = () => {
    const history = useHistory();
    const idRef = useRef();
    const passRef = useRef();
    const [isCustomer, setIsCustomer] = useState(true);
    const dispatch = useDispatch();

    const customerClickHandler = (state) => {
        setIsCustomer(true);
    }

    const branchClickHandler = (state) => {
        setIsCustomer(false);
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        let email = idRef.current.value.trim();
        let password = passRef.current.value.trim();
        if (email.length === 0) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata",
                message: "Email alanı boş bırakılamaz!"
            }));
            return;
        }

        if (!email.includes("@")) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata",
                message: "Email alanı hatalı!"
            }));
            return;
        }
        if (password.length === 0) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata",
                message: "Şifre alanı boş bırakılamaz!"
            }));
            return;
        }
        let role;
        if (isCustomer) {
            role = "CUSTOMER";
        } else {
            role = "BRANCH";
        }
        dispatch(sendLoginData({
            email,
            password,
            history,
            role,
        }))
    }

    const registerHandler = () => {
        history.push("/kaydol");
        dispatch(uiActions.clearNotification());
    }

    let customerClasses = classes.customer;
    let branchClasses = classes.branch;
    let inputString;

    if (isCustomer) {
        branchClasses += ` ${classes.inactive}`;
        inputString = "E-Posta Adresiniz";
    } else {
        customerClasses += ` ${classes.inactive}`;
        inputString = "Şube E-Posta Adresiniz";
    }


    return (
        <Layout>
            <form onSubmit={submitFormHandler} className={classes.form}>
                <Text className={classes.title}>Şube Sıra Takip Sistemine Hoş Geldiniz</Text>
                <div className={classes.selector}>
                    <Text onClick={customerClickHandler} className={customerClasses}>Kullanıcı</Text>
                    <VerticalSeparator/>
                    <Text onClick={branchClickHandler} className={branchClasses}>Şube</Text>
                </div>
                <Input ref={idRef} className={classes.id} input={{
                    placeholder: inputString,
                    type: "text"
                }}/>
                <Input ref={passRef} className={classes.pass} input={{
                    placeholder: "Şifre",
                    type: "password"
                }}/>
                <BigButton className={classes.continue} text="GİRİŞ"/>
                <BigButton onClick={registerHandler} className={classes.register} text="KAYDOL"/>
            </form>
        </Layout>
    );

}
export default LoginPage;