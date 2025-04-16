import NavigationMenu from "@/components/Navbar";

export default function Layout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <main className="font-work-sans">
            <NavigationMenu />
            <div className="relative mx-5">
                {children}
            </div>
        </main>
    )
}