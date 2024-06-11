import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Header from "./pages/Header";
import Navbar from "./pages/Navbar";
import Cart from "./pages/Cart";
import ProductListing from "./pages/ProductListing";
import Loader from "./pages/Loader";

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
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;

// {/* <Router>
//   {/* Header */}
//   <Header user={user} />
//   <Suspense fallback={<Loader />}>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/search" element={<Search />} />
//       <Route path="/cart" element={<Cart />} />
//       {/* Not logged In Route */}
//       <Route
//         path="/login"
//         element={
//           <ProtectedRoute isAuthenticated={user ? false : true}>
//             <Login />
//           </ProtectedRoute>
//         }
//       />
//       {/* Logged In User Routes */}
//       <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
//         <Route path="/shipping" element={<Shipping />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/order/:id" element={<OrderDetails />} />
//         <Route path="/pay" element={<Checkout />} />
//       </Route>
//       {/* Admin Routes */}
//       <Route
//         element={
//           <ProtectedRoute
//             isAuthenticated={true}
//             adminOnly={true}
//             admin={user?.role === "admin" ? true : false}
//           />
//         }
//       >
//         <Route path="/admin/dashboard" element={<Dashboard />} />
//         <Route path="/admin/product" element={<Products />} />
//         <Route path="/admin/customer" element={<Customers />} />
//         <Route path="/admin/transaction" element={<Transaction />} />
//         {/* Charts */}
//         <Route path="/admin/chart/bar" element={<Barcharts />} />
//         <Route path="/admin/chart/pie" element={<Piecharts />} />
//         <Route path="/admin/chart/line" element={<Linecharts />} />
//         {/* Apps */}
//         <Route path="/admin/app/coupon" element={<Coupon />} />
//         <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
//         <Route path="/admin/app/toss" element={<Toss />} />

//         {/* Management */}
//         <Route path="/admin/product/new" element={<NewProduct />} />

//         <Route path="/admin/product/:id" element={<ProductManagement />} />

//         <Route
//           path="/admin/transaction/:id"
//           element={<TransactionManagement />}
//         />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   </Suspense>
//   <Toaster position="bottom-center" />
// </Router>; */}
