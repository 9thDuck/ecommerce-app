import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItemProps {
  icon: LucideIcon;
  text: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon: Icon,
  text,
  className,
  iconClassName,
  textClassName,
}) => (
  <motion.div
    className={cn("flex items-center space-x-4 bg-card p-6 rounded-xl shadow-md", className)}
    whileHover={{ y: -5 }}
  >
    <Icon className={cn("w-10 h-10 text-primary", iconClassName)} />
    <p className={cn("text-foreground/90", textClassName)}>{text}</p>
  </motion.div>
);

export default FeatureItem;