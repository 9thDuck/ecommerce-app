import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}) => (
  <motion.div
    className={cn("p-8 rounded-2xl shadow-lg", className)}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h2 className={cn("text-3xl font-bold text-primary mb-4", titleClassName)}>
      {title}
    </h2>
    <p className={cn("text-foreground/90", descriptionClassName)}>
      {description}
    </p>
  </motion.div>
);

export default InfoCard;
