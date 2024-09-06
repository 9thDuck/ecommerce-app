import { NAV_ITEMS } from "@/constants";
import { Link } from "react-router-dom";
import NavItemWithCount from "./nav-item-with-count";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store";
import { useState, useEffect } from "react";
import MobileNav from "./mobile-nav";

const Navbar = () => {
  const { items } = useAppSelector((state) => state.cart);
  const cartCount = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="flex justify-between items-center">
      {isMobile ? (
        <MobileNav cartCount={cartCount} />
      ) : (
        <ul className="flex gap-4">
          {NAV_ITEMS.map((item) => {
            if (item.name === "Cart") {
              return (
                <li key={item.name}>
                  <NavItemWithCount
                    to={item.path}
                    icon={ShoppingCart}
                    label={item.name}
                    count={cartCount}
                  />
                </li>
              );
            } else {
              return (
                <li key={item.name} className="text-white">
                  <Link to={item.path}>{item.name}</Link>
                </li>
              );
            }
          })}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
