

const BadgeComponent = ({color, text}:{color:string, text:string}) => {
    
    const bgColor = (color=='warning') ? "bg-yellow-200"
                                        : (color=='success')
                                            ? "bg-emerald-200"
                                            : "bg-cyan-200";
    const textColor = (color=='warning') ? "text-yellow-800"
                                            : (color=='success')
                                                ? "text-emerald-800"
                                                : "text-cyan-800";
    const hoverBgColor = (color=='warning') ? "hover:bg-yellow-300"
                                                : (color=='success')
                                                    ? "hover:bg-emerald-300"
                                                    : "hover:bg-cyan-300";

    
    return(
        <span className={`${bgColor} ${textColor} ${hoverBgColor} text-sm md:text-lg text-center px-3 py-1 rounded-2xl`}> {text} </span>
    )
}

export default BadgeComponent;

