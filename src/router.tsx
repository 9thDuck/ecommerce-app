import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout/layout";
import About from "./pages/about";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
