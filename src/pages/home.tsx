import { lazy, Suspense } from 'react'
import PageContent from "../components/page-content"

const Hero = lazy(() => import("@/components/ui/globe-hero"))

const Home = () => {
    return (
        <PageContent>
            <Suspense fallback={<div>Loading...</div>}>
                <Hero />
            </Suspense>
        </PageContent>
    )
}

export default Home