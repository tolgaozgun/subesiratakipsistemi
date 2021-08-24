import logo from "../../../assets/logo.png";

const HeaderLogo = props => {
    return (
        <img alt="logo" src={logo} className={props.className}/>
    )
}

export default HeaderLogo;