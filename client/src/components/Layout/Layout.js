import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
//import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, author, keyword }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "72vh" }}>
        <Toaster />
        {children}
      </main>

      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app",
  description: "Ecommerce application",
  author: "Prabesh Dangi",
  keyword: ["ecommerce", "sasto-masto", "digital", "online"],
};

export default Layout;
