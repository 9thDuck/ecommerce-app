import Header from "../ui/header/header"
import { Footer } from "../ui/footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="flex flex-col h-auto min-h-screen mx-auto w-full justify-between bg-secondary">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
