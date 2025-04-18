import { FloatingLabel } from "flowbite-react";

const FloatingLabelComponent = ({...props}) => {
    return(
        <>
            <FloatingLabel
                label={props.label}
                type={props.type}
                value={props.value}
                className={`props.className ${"text-lg"}` || "text=lg"}
                onChange={props.onChange}
                variant="standard"
            />
        </>
    )
}

export default FloatingLabelComponent;