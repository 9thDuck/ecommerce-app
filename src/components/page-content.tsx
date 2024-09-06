const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex-grow container mx-auto p-4">{children}</main>;
};

export default PageContent;
