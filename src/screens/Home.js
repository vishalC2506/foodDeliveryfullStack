import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import Cardcom from "../components/Cardcom";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    //console.log(response[0], response[1]);
    setFoodCategory(response[1]);
    setFoodItem(response[0]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="border-2 border-green-700">
        <Carousel
          fade
          className="opactiy-50 bg-gray-700 max-h-[31.2rem] !object-contain"
        >
          <Carousel.Item className="!max-h-[31.2rem] ">
            <img
              className="d-block object-contain  opacity-20 bg-gray-400  m-auto"
              src="https://source.unsplash.com/random/?pizza"
              alt="First slide"
            />
            <Carousel.Caption className=" z-10 w-[75%]   ">
              <div className="m-auto w-full  ">
                <div className=" m-auto w-[75%]">
                  <input
                    type="search"
                    placeholder="Search"
                    className="rounded-md focus:outline-blue-700 focus:outline-offset-2 
                    p-2 !w-full text-black font-semibold
                  "
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className=" !max-h-[31.2rem]">
            <img
              className="d-block object-contain  opacity-20 bg-gray-400 m-auto"
              src="https://source.unsplash.com/random/500x600/?burger"
              alt="Second slide"
            />
            <Carousel.Caption className="z-10 w-[75%]  ">
              <div className="m-auto w-full  ">
                <div className=" m-auto w-[75%]">
                  <input
                    type="search"
                    placeholder="Search"
                    className="rounded-md focus:outline-blue-700 focus:outline-offset-2 
                p-2 !w-full text-black font-semibold
              "
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="!bg-[center_center] !max-h-[31.2rem]">
            <img
              className="d-block opacity-20  bg-gray-400 object-contain m-auto"
              src="https://source.unsplash.com/random/?biryani"
              alt="Third slide"
            />
            <Carousel.Caption className="z-10 w-[75%]  ">
              <div className="m-auto w-full  ">
                <div className=" m-auto w-[75%]">
                  <input
                    type="search"
                    placeholder="Search"
                    className="rounded-md focus:outline-blue-700 focus:outline-offset-2 
                p-2 !w-full text-black font-semibold
              "
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        {foodCategory
          ? foodCategory.map((data) => {
              return (
                <div className=" mb-3  " key={data._id}>
                  <div key={data._id} className="m-2 font-bold">
                    {data.CategoryName}
                  </div>
                  <hr />
                  <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 justify-center">
                    {foodItem ? (
                      foodItem
                        .filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((filterItems) => {
                          return (
                            <div key={filterItems._id}>
                              <Cardcom
                                foodItem={filterItems}
                                options={filterItems.options[0]}
                              />
                            </div>
                          );
                        })
                    ) : (
                      <div>No Data is Found</div>
                    )}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
