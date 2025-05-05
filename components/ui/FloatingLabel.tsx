import { FloatingLabel } from "flowbite-react";

const FloatingLabelComponent = ({...props}) => {
    return(
        <>
            <FloatingLabel
                label={props.required ? <span className="font-bold">{props.label} *</span> : props.label}
                type={props.type}
                value={props.value}
                className={`text-lg ${props.className}` || "text-lg"}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                variant="standard"
                autoComplete="off"
                min={props.min}
                max={props.max}
                placeholder={props.placeholder ?? ""} // remove ?? "" to make label stick up
            />
        </>
    )
}

export default FloatingLabelComponent;