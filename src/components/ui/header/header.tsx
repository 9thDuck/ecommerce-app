import Branding from "../../branding"
import { Navbar } from "../navbar"

const Header = () => {
    return (
        <header className="h-20 bg-primary w-screen shadow-lg">
            <div className="flex justify-between items-center h-full w-full container mx-auto">
                <Branding />
                <Navbar />
            </div>
        </header>
    )
}

export default Header
