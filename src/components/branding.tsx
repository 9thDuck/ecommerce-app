// import Logo from "./logo"
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Logo from "./logo";

const Branding = ({ className }: { className?: string }) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
        className
      )}
    >
      <Link to="/" className="flex items-center gap-2">
        <Logo className="w-8 h-8" />
        <h2 className="text-2xl font-bold">MyShop</h2>
      </Link>
    </Button>
  );
};

export default Branding;
