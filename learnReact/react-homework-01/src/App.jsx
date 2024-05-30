// import React from "react";
import { router } from "./Utils/router";
import AboutPage from "./pages/AboutPage";
import DefaultLayout from "./pages/DefaultLayout";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return router(
    [
      {
        path: "/",
        component: HomePage,
      },
      {
        path: "/about",
        component: AboutPage,
      },
      {
        path: "/products",
        component: ProductsPage,
      },
      {
        path: "/products/:id",
        component: ProductDetail,
      },
    ],
    DefaultLayout
  );
}
