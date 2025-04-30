import NavigationMenu from "@/components/Navbar";

export default function Layout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <main>
            <NavigationMenu />
            <div className="relative m-3">
                {children}
            </div>
        </main>
    )
}