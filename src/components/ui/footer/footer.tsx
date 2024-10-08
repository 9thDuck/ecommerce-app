import { NAV_ITEMS } from "@/constants";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Branding from "../../branding";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-4 md:min-h-[150px]">
      <div className="container mx-auto px-4 flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between items-center flex-grow">
          <div className="mb-2 md:mb-0 flex flex-col items-center">
            <Branding />
            <p className="text-sm mt-2 mx-auto">
              Your one-stop shop for everything
            </p>
          </div>
          <nav className="hidden md:flex flex-wrap justify-center md:justify-end">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="mx-2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to={item.path}>{item.name}</Link>
              </Button>
            ))}
          </nav>
        </div>
        <div className="mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
