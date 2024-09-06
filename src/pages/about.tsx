import PageContent from "@/components/page-content";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import InfoCard from "@/components/ui/info-item-card";
import FeatureItem from "@/components/ui/feature-item-card";
import { ABOUT_PAGE_CONTENT } from "@/constants";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <PageContent>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-primary mb-4">
            {ABOUT_PAGE_CONTENT.title}
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            {ABOUT_PAGE_CONTENT.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {ABOUT_PAGE_CONTENT.infoCards.map((info) => (
            <InfoCard
              key={info.title}
              {...info}
              className="hover:shadow-xl transition-colors duration-300 hover:bg-primary/5"
              titleClassName="text-4xl mb-6"
              descriptionClassName="text-lg"
            />
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-primary mb-10 text-center">
            {ABOUT_PAGE_CONTENT.featuresTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ABOUT_PAGE_CONTENT.features.map((item) => (
              <FeatureItem
                key={item.text}
                {...item}
                className="hover:bg-primary/5 transition-colors duration-300"
                iconClassName="w-12 h-12 text-primary/80"
                textClassName="text-lg font-medium"
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          {ABOUT_PAGE_CONTENT.ctaButtons.map((button, index) => (
            <Button
              key={index}
              asChild
              size="lg"
              variant={button.variant as "default" | "outline"}
              className={cn("px-8 py-6 text-lg", index > 0 ? "ml-4" : "")}
            >
              <Link to={button.path} title={button.text}>
                {button.text}
              </Link>
            </Button>
          ))}
        </div>
      </motion.div>
    </PageContent>
  );
};

export default About;
