import { Button } from "flowbite-react";


const ButtonComponent = ({...props}) => {
    return(
        <>
            <Button 
                name={props.name}
                value={props.value}
                onClick={props.onClick}
                onChange={props.onChange}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-lg text-nowrap"
            > 
                {props.text}
            </Button>
        </>
    )
}

export default ButtonComponent;