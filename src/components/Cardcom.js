import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import Card from "react-bootstrap/Card";

const Cardcom = (props) => {
  let data = useCart();
  let dispatch = useDispatchCart();
  const priceRef = useRef();
  let options = props.options;
  let optionPrice = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  // console.log(optionPrice);
  const handleAddToCart = async (e) => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food ) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price:finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);
  return (
    <div>
      <Card
        style={{ width: "18rem" }}
        className="m-3 max-h-[28.5rem] shadow-[2px_2px_10px_-2px_rgba(0,0,0,0.5)]"
      >
        <Card.Img variant="top" src={props.foodItem.img} className="h-44" />
        <Card.Body>
          <Card.Title>{props.foodItem.name}</Card.Title>
          <div className="flex flex-col w-full justify-center">
            <div>
              <select
                className="m-2 w-12 bg-success rounded-md px-1"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 w-12 bg-success rounded-md px-1"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {optionPrice.map((items) => {
                  return (
                    <option key={items} value={items}>
                      {items}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="inline text-md font-bold ">Rs:{finalPrice}</div>
            <hr />
            <button
              className="px-2 border-1 rounded-md bg-gray-200 py-1 font-serif
             font-semibold hover:bg-green-300 hover:drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)] duration-300 ease-in-out"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cardcom;
