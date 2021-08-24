import classes from "./RegisterPage.module.css";
import Text from "../components/UI/Form/Text";
import Input from "../components/UI/Form/Input";
import React, {useRef, useState} from "react";
import VerticalSeparator from "../components/UI/Form/VerticalSeparator";
import BigButton from "../components/UI/Form/BigButton";
import Layout from "../components/Layout/Layout";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendRegisterData} from "../store/auth-actions";
import {uiActions} from "../store/ui-slice";
import Select from "react-select";

const RegisterPage = () => {
    const history = useHistory();
    const nameRef = useRef();
    const idRef = useRef();
    const passRef = useRef()
    const confirmPassRef = useRef();
    const [isCustomer, setIsCustomer] = useState(true);
    const [branch, setBranch] = useState(-1);
    const dispatch = useDispatch();
    const branches = useSelector(state => state.branches.branchList);
    const branchNames = [];

    branches.map(branch => branchNames.push({
        label: branch.name,
        value: branch.code
    }));

    const customerClickHandler = (state) => {
        setIsCustomer(true);
    }

    const branchClickHandler = (state) => {
        setIsCustomer(false);
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        let name;
        if(isCustomer){
            name = nameRef.current.value.trim();
        }else{
            name = branch.label;
        }
        let email = idRef.current.value.trim();
        let password = passRef.current.value.trim();
        let confirmPass = confirmPassRef.current.value.trim();
        if (email.length === 0) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata",
                message: "Email alanı boş bırakılamaz!"
            }));
            return;
        }

        if (isCustomer && name.length === 0) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata",
                message: "İsim alanı boş bırakılamaz!"
            }));
            return;
        }

        if (!name.includes(" ")) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata",
                message: "Soyadınızı girmelisiniz!"
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
        if (password.length < 6) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata",
                message: "Şifreniz 6 karakterden kısa olamaz!"
            }));
            return;
        }

        if (confirmPass !== password) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata",
                message: "Şifreler eşleşmiyor!"
            }));
            return;
        }

        if (!isCustomer && branch.value === -1) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata",
                message: "Şubenizi giriniz!"
            }));
            return;
        }

        let role;
        if (isCustomer) {
            role = "CUSTOMER";
        } else {
            role = "BRANCH";
        }
        dispatch(sendRegisterData({
            email,
            password,
            history,
            role,
            branchCode: branch.value,
            name,
        }));
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

    const loginHandler = (event) => {
        event.preventDefault();
        history.push("/");
        dispatch(uiActions.clearNotification());
    }

    const selectChangeHandler = (selectedOption) => {
        setBranch(selectedOption);
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
                {!isCustomer && <Select className={classes.select}
                                        placeholder="Şubenizi Seçin"
                                        options={branchNames}
                                        onChange={selectChangeHandler}
                />}
                {isCustomer &&
                <Input ref={nameRef} className={classes.name} input={{
                    placeholder: "Adınız Soyadınız",
                    type: "text"
                }}/>}
                <Input ref={idRef} className={classes.id} input={{
                    placeholder: inputString,
                    type: "text"
                }}/>
                <Input ref={passRef} className={classes.pass} input={{
                    placeholder: "Şifre",
                    type: "password"
                }}/>
                <Input ref={confirmPassRef} className={classes.confirmpass} input={{
                    placeholder: "Tekrar Şifre",
                    type: "password"
                }}/>
                <BigButton className={classes.continue} text="KAYDOL"/>
                <BigButton onClick={loginHandler} className={classes.back} text="GİRİŞ"/>
            </form>
        </Layout>
    );

}
export default RegisterPage;