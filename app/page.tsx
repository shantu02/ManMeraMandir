
import { redirect } from "next/navigation"


const page = async() => {

    return(
        redirect("/home")
    )
}

export default page