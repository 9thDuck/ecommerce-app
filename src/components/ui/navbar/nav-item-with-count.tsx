import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItemWithCountProps {
  to: string;
  icon: LucideIcon;
  label: string;
  count: number;
  title: string;
}

const NavItemWithCount: React.FC<NavItemWithCountProps> = ({
  to,
  icon: Icon,
  title,
  label,
  count,
}) => {
  return (
    <Link to={to} className="flex items-center text-white gap-2" title={title}>
      <div className="relative">
        <Icon className="w-5 h-5" />
        {count > 0 && (
          <span
            className={cn(
              "absolute -top-2 -right-2 bg-primary-foreground text-primary text-xs rounded-full w-4 h-4 flex items-center justify-center"
            )}
          >
            {count}
          </span>
        )}
      </div>
      <span className="ml-1">{label}</span>
    </Link>
  );
};

export default NavItemWithCount;
