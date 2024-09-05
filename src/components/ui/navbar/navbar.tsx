import { NAV_ITEMS } from "@/constants"
import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <nav className="flex justify-between items-center">
            <ul className="flex gap-4">
                {NAV_ITEMS.map((item) => (
                    <li key={item.name} className="text-white">
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
