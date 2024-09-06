import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { NAV_ITEMS } from "@/constants";
import NavItemWithCount from "./nav-item-with-count";

interface MobileNavProps {
  cartCount: number;
}

const MobileNav: React.FC<MobileNavProps> = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="z-20 md:z-0 md:hidden">
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none mr-4 "
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-primary p-4">
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              if (item.name === "Cart") {
                return (
                  <li key={item.name}>
                    <NavItemWithCount
                      title={`Go to ${item.name} page`}
                      to={item.path}
                      icon={ShoppingCart}
                      label={item.name}
                      count={cartCount}
                      onClick={closeMenu}
                    />
                  </li>
                );
              } else {
                return (
                  <li key={item.name} className="text-white">
                    <Link
                      to={item.path}
                      title={`Go to ${item.name} page`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
