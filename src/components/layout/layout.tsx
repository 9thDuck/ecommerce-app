import React from "react"
import { Header } from "../header"
import { Footer } from "../footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="flex flex-col h-auto min-h-screen mx-auto w-full justify-between bg-secondary">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
