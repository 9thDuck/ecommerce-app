import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItemWithCountProps {
  to: string;
  icon: LucideIcon;
  label: string;
  count: number;
}

const NavItemWithCount: React.FC<NavItemWithCountProps> = ({
  to,
  icon: Icon,
  label,
  count,
}) => {
  return (
    <Link to={to} className="relative flex items-center text-white">
      <Icon className="w-5 h-5 mr-1" />
      <span>{label}</span>
      {count > 0 && (
        <span
          className={cn(
            "absolute -top-2 -right-2 bg-primary-foreground text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center"
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
};

export default NavItemWithCount;
