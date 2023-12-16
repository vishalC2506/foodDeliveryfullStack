import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrders";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/createuser" element={<SignUp />}></Route>
          <Route exact path="/myOrder" element={<MyOrder />}></Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
