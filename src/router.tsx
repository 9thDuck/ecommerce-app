import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout/layout";
import About from "./pages/about";
import { Products } from "./pages/products";
import { Cart } from "./pages/cart";
import ProductDetails from "./pages/product-details";
import { Orders } from "./pages/orders";
import NotFound from "./pages/not-found";
import ErrorBoundary from "./components/ui/error-boundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
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
      {
        path: "/products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: "/products/:id",
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
