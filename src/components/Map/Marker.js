import image from "../../assets/marker.png";

const Marker = props => {
    return (
        <img onClick={props.onClick} alt="marker" width={"64px"} height={"64px"} src={image}/>
    )
}

export default Marker;