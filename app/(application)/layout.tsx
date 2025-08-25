import NavigationMenu from "@/components/Navbar";

export default function Layout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <main className="">
            <div className="md:flex md:h-screen">
                <div className="w-full md:w-[14rem] bg-cyan-800 overflow-hidden whitespace-nowrap text-ellipsis">
                    <NavigationMenu />
                </div>
                <div className="relative flex-1 ml-2 w-[70vw] overflow-y-auto">
                    {children}
                </div>
            </div>
        </main>
    )
}