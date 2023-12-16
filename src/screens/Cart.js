import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import DeleteIcon from "@mui/icons-material/Delete";
function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div className="w-full flex justify-center">
        <div
          className="m-5 w-full text-center text-lg underline font-bold underline-offset-2
         drop-shadow-[2px_2px_2px_rgba(36,35,34,0.8)]"
        >
          Cart is Empty
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:4000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div className="">
      <div className="m-auto mt-5 rounded-md drop-shadow-lg w-[clamp(15rem,95%,98%)]">
        <table className="w-full  bg-gray-700  text-white rounded-md">
          <thead className="text-sucess underline ">
            <tr className="my-2 ">
              <th className="text-center ">#</th>
              <th className="text-center px-1 ">Name</th>
              <th className="text-center px-1 ">Quantity</th>
              <th className="text-center px-1 ">Option</th>
              <th className="text-center px-1 ">Amount</th>
              <th></th>
            </tr>
            
          </thead>
          <div ></div>
          <tbody>
            {data.map((food, index) => (
              <tr className="text-ecllipse space-y-2 ">
                <th scope="row" className="text-center">
                  {index + 1}
                </th>
                <td className="text-center px-1">{food.name}</td>
                <td className="text-center px-1">{food.qty}</td>
                <td className="text-center px-1">{food.size}</td>
                <td className="text-center px-1">{food.price}</td>
                <td className="text-center px-1">
                  <button
                    type="button"
                    className="px-2 py-2 border-1 bg-red-400 rounded-md font-semibold 
                drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] hover:drop-shadow-[2px_2px_2px_rgba(0,0,0,1)] 
                duration-300 delay-150 ease-in-out hover:bg-green-500 hover:text-white h-8 flex items-center"
                  >
                    <DeleteIcon
                      className="h-4 "
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="text-gray-400 mx-2">Total Price: {totalPrice}/-</h1>
      </div>
      <div>
        <button
          className="px-2 py-2 border-1 bg-red-400 rounded-md font-semibold 
          drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] hover:drop-shadow-[2px_2px_2px_rgba(0,0,0,1)] 
          duration-300 delay-150 ease-in-out hover:bg-green-500 hover:text-white mx-2"
          onClick={handleCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}

export default Cart;
