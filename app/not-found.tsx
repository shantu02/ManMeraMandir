
import ErrorPage from "@/components/ErrorPage"
import { ErrorType } from "@/types/error_type";

const NotFound = () => {

    const errorObj:ErrorType = {
            code: 404,
            message: "Oops!! The page you are looking for does not exist!!"
        };

    return (
        <ErrorPage error={errorObj}/>
    );
}

export default NotFound;