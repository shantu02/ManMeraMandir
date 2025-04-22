
interface BadgeComponentType {
    text: string,
    color: string,
    onlySmall?: boolean
}

const BadgeComponent = ({color, text, onlySmall=false}:BadgeComponentType) => {
    
    const bgColor = (color=='warning') ? "bg-yellow-200"
                                        : (color=='success')
                                            ? "bg-emerald-200"
                                            : (color=='danger')
                                                ? "bg-red-200"
                                                : "bg-cyan-200";
    const textColor = (color=='warning') ? "text-yellow-800"
                                            : (color=='success')
                                                ? "text-emerald-800"
                                                : (color=='danger')
                                                    ? "text-red-800"
                                                    : "text-cyan-800";
    const hoverBgColor = (color=='warning') ? "hover:bg-yellow-300"
                                                : (color=='success')
                                                    ? "hover:bg-emerald-300"
                                                    : (color=='danger')
                                                        ? "hover:bg-red-300"
                                                        : "hover:bg-cyan-300";

    
    return(
        <span className={`${bgColor} ${textColor} ${hoverBgColor} text-sm ${onlySmall ?? "md:text-lg"} text-center px-3 py-1 rounded-2xl`}> {text} </span>
    )
}

export default BadgeComponent;

