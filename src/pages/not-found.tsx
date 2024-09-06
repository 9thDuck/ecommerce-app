import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageContent from "@/components/page-content";

const NotFound: React.FC = () => {
  return (
    <PageContent>
      <div className="flex flex-col items-center justify-center min-h-[50vh] m-auto bg-gray-100">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">Go back to Home</Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default NotFound;
