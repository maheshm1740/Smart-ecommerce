import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import useAxiosInterceptor from "./hooks/useAxiosInterseptor";
import Checkout from "./components/cart/Checkout";
import OrdersPage from "./pages/Orders";

function AppLay()
{
  const location = useLocation();
  const showNav=location.pathname !='/' && location.pathname != 'signup';
  return (
    <>
      <InterceptorWrapper />
      {showNav && <Navbar/>}
      <Routes>
        <Route path="/home" element={<Homepage/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Register />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrdersPage/>}/>
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
      </Routes>
    </>
  );
}

const InterceptorWrapper = () => {
  useAxiosInterceptor();
  return null;
};

export default AppLay;