import type { FC, SVGProps } from "react";

const CustomIconColor = (
  Icon: FC<SVGProps<SVGSVGElement>>,
  colorClass = "text-blue-500"
): FC<SVGProps<SVGSVGElement>> => {
  const ColoredIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <Icon
      {...props}
      className={`w-5 h-5 ${colorClass} ${props.className || ""}`}
    />
  );

  ColoredIcon.displayName = `ColoredIcon(${Icon.displayName || Icon.name || "AnonymousIcon"})`;

  return ColoredIcon;
};

export default CustomIconColor;
