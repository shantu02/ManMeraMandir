import Image from "next/image";

export default function ImageToIcon(src:string){
    const CashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
        <svg {...props} viewBox="0 0 24 24" width="20" height="20">
          <Image src={src} alt="icon" width="20" height="20" />
        </svg>
    );
    return CashIcon;
}

