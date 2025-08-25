import type { FC, SVGProps } from "react";

const CustomIconColor = (
  Icon: FC<SVGProps<SVGSVGElement>>,
  colorClass = "text-blue-500"
): FC<SVGProps<SVGSVGElement>> => {
  return (props) => (
    <Icon {...props} className={`w-5 h-5 ${colorClass} ${props.className || ""}`} />
  );
};

export default CustomIconColor;