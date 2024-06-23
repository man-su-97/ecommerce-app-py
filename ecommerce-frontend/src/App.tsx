import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Header from "./pages/Header";
import Navbar from "./pages/Navbar";
import Cart from "./pages/Cart";
import ProductListing from "./pages/ProductListing";
import Loader from "./pages/Loader";
import BlogListing from "./pages/BlogListing";
import ContactSection from "./pages/ContactSection";
import FaqSection from "./pages/FaqSection";
import { SignInSide, SignUp } from "./pages/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product-listing" element={<ProductListing />} />
            <Route path="/blog-listing" element={<BlogListing />} />
            <Route path="/contact-listing" element={<ContactSection />} />
            <Route path="/faq-section" element={<FaqSection />} />
            <Route path="shopping-cart" element={<Cart />} />
            <Route path="/sign-in" element={<SignInSide />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Suspense>
        <Toaster position="bottom-right" />
      </Router>
    </>
  );
}

export default App;
