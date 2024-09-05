const PageContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex-grow container mx-auto">
            {children}
        </main>
    )
}

export default PageContent
