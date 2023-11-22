import React from "react";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Main from "./component/main/Main";
import Banner from "./component/header/Banner";
import ViewDetail from "./component/main/ViewDetail";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import CreateProduct from "./component/product/CreateProduct";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Cart from "./component/cart/Cart";
import UserManagement from "./component/admin/UserManagement";
import Contact from "./component/header/Contact";
import Feedback from "./component/header/Feedback";
import NotFound from "./component/error/NotFound";
import Something from "./component/error/Something";
import ForbiddenPage from "./component/error/Forbidden";
import MyProduct from "./component/product/MyProduct";
import MyProductDelete from "./component/product/MyProductDelete";
import Profile from "./component/auth/Profile";
import HotProductsPage from "./component/main/TopHot";
import News from "./component/main/News";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="App">
    <header>
      <Header />
      <Banner />
    </header>
    {children}
    <Footer />
  </div>
);

const LayoutNotBanner = ({ children }: { children: React.ReactNode }) => (
  <div className="App">
    <header>
      <Header />
    </header>
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" element={<Main />} />
        </Route>

        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/wrong" element={<Something />} />

        {/* layout not banner */}
        <Route
          element={
            <LayoutNotBanner>
              <Outlet />
            </LayoutNotBanner>
          }
        >
          <Route path="/view-detail/:productId" element={<ViewDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/myProduct" element={<MyProduct />} />
          <Route path="/myProductDelete" element={<MyProductDelete />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/hot" element={<HotProductsPage />} />
          <Route path="/news" element={<News />} />

          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
