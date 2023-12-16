import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import Badge from "react-bootstrap/Badge";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const loadCart = () => {
    setCartView(true);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-gray-500">
        <Container className="">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-full me-auto">
              <div className="flex flex-col md:flex-row w-full ">
                <div className=" px-2  w-[clamp(8rem,10rem,15rem)] ">
                  <Nav.Link className="w-full">
                    <Link
                      to="/"
                      className=" no-underline text-white font-bold m-2 text-lg duration-300 ease-in-out 
                      hover:drop-shadow-[3px_3px_1.5px_rgba(218,224,235)]
                      drop-shadow-[_2px_2px_rgba(86,99,99,0.8)] w-[clamp(5rem,8rem,10rem)] p-auto text-center"
                    >
                      GO FOOD
                    </Link>
                  </Nav.Link>
                </div>
                <div className="flex flex-col md:flex-row justify-between  mx-2 w-[85%]  ">
                  <Link
                    to="/"
                    className="no-underline duration-300 ease-in-out text-white m-2 font-bold tracking-wide  text-lg
                    drop-shadow-[2px_2px_rgba(86,99,99,0.8)] shadow-blue-500 hover:drop-shadow-[1.5px_1.5px_1.5px_rgba(218,224,235)]"
                  >
                    Home
                  </Link>
                  {localStorage.getItem("authToken") ? (
                    <Link
                      to="/myOrder"
                      className="no-underline duration-300 ease-in-out text-white m-2 font-bold tracking-wide  text-lg
                  drop-shadow-[2px_2px_rgba(86,99,99,0.8)] shadow-blue-500 hover:drop-shadow-[1.5px_1.5px_1.5px_rgba(218,224,235)]"
                    >
                      My Orders
                    </Link>
                  ) : (
                    ""
                  )}
                  {!localStorage.getItem("authToken") ? (
                    <div className="flex ">
                      <button
                        className="border-1 mx-1 hover:drop-shadow-[0.1rem_0.1rem_0.5rem_rgba(6,74,16,0.8)] 
                  rounded-md px-2 duration-300 ease-in-out"
                      >
                        <Link
                          to="/login"
                          className="no-underline text-white m-2 
                  font-bold tracking-wide drop-shadow-[_2px_2px_rgba(86,99,99,0.8)]  "
                        >
                          Login
                        </Link>
                      </button>
                      <button
                        className="border-1 mx-1 py-1 duration-300 ease-in-out
                   hover:drop-shadow-[0.1rem_0.1rem_0.5rem_rgba(6,74,16,0.8)] rounded-md px-2"
                      >
                        <Link
                          to="/createuser"
                          className="no-underline text-white m-2 
              font-bold tracking-wide drop-shadow-[_2px_2px_rgba(86,99,99,0.8)] "
                        >
                          SignUp
                        </Link>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row">
                      <button
                        className="border-1  mx-1 py-1 rounded-md px-2 duration-300 ease-in-out
                     no-underline text-white m-2 font-bold tracking-wide  text-lg  w-[10rem] sm:w-[8rem]
                  drop-shadow-[2px_2px_rgba(86,99,99,0.8)] shadow-blue-500 hover:drop-shadow-[1.5px_1.5px_1.5px_rgba(218,224,235)]"
                        onClick={loadCart}
                      >
                        My Cart
                        <Badge pill bg="danger" className="mx-1">
                          {data.length}
                        </Badge>
                      </button>
                      {cartView ? (
                        <Modal onClose={() => setCartView(false)}>
                          <Cart></Cart>
                        </Modal>
                      ) : (
                        ""
                      )}
                      <button
                        className="border-1 mx-1 py-1 rounded-md px-2 duration-300 ease-in-out
                        no-underline text-white m-2 font-bold tracking-wide  text-lg  w-[10rem] sm:w-[8rem]
                     drop-shadow-[2px_2px_rgba(86,99,99,0.8)] shadow-blue-500 hover:drop-shadow-[1.5px_1.5px_1.5px_rgba(156,44,36)]"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
