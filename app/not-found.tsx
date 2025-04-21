
import ErrorPage from "../components/ErrorPage"

const NotFound = () => {
    return (
        <ErrorPage code={404} message={"Oops!! The page you are looking for does not exist!!"}/>
    );
}

export default NotFound;