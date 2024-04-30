import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [Items, setItems] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  console.log(error);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/Sale/getallproduct`);
        const data = await res.json();

        if (res.ok) {
          setItems(data.Product);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);

  const handleAddToCart = async (itemId) => {
    try {
      const selectItem = Items.find((item) => item._id === itemId);
      if (!selectItem) {
        throw new Error("Item not found");
      }

      const response = await fetch(`/api/Sale/addcart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          customerId: currentUser._id,
          address: currentUser.Adress,
          phoneN: currentUser.phone,
          name: selectItem.name,
          image: selectItem.image,
          price: selectItem.price,
          quantity: selectItem.quantity,
          desc: selectItem.desc,
        }),
      });

      if (!response.ok) {
        console.log("error")
      } else {
       alert("succeccfull")
       navigate("/cart")
        
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCart = () => {
    if (currentUser) {
      handleAddToCart();
    } else {
      window.scrollTo(0, 0);
      navigate("/sign-in");
    }
  };

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Items]);
    } else {
      // If there's a query, filter the data
      const filteredData = Items.filter(
        (item) =>
          item.name && item.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Items]);

  return (
    <div>
      <div className="ml-8    flex justify-center items-center">
        <form>
          <input
            type="text"
            placeholder="Search... "
            className=" w-[300px] h-8 rounded-lg shadow-xl mt-4"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div>
        <div className="flex justify-center items-center">
          <h className="text-[30px]  font-serif text-slate-600 mt-6  ">
           Product List
          </h>
        </div>

        <div className="flex justify-center mt-4">
         
          <div className="flex flex-wrap justify-center gap-8 ">
            {filter && filter.length > 0 ? (
              <>
                {filter.slice(0, showMore ? filter.length : 7).map((item) => (
                  <div
                    key={item._id}
                    className="w-[300px] h-[400px]  mt-10 mb-5 border rounded-2xl shadow-xl   "
                  >
                    
                      <div className="flex justify-center items-center">
                        <img
                          className="w-[300px] rounded-2xl  h-[200px] "
                          src={item.image}
                        
                        />
                      </div>
                
                    <div className="px-6 py-4">
                     
                        <div className="flex justify-center items-center ml-12">
                          <div className="font-extralight text-xl text-black mb-2 truncate w-32">
                            {item.name}
                          </div>
                        </div>

                        <div className="border rounded-3xl">

                        <div className="flex justify-center items-center">
                          <p className="font-extralight  text-black text-base">
                            Rs.{item.price}
                          </p>
                        </div>

                        <div className="flex justify-center items-center">
                          <p className="font-extralight  text-black text-base">
                            {item.quantity}-Item
                          </p>
                        </div>
                        <div className="flex justify-center items-center">
                          <p className="font-extralight  text-black text-base">
                            {item.desc}
                          </p>
                        </div>
                        </div>

                  
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      {currentUser ? (
                        <div className="flex justify-center items-center">
                          <button
                            className="bg-blue-600 hover:text-black text-white font-extralight py-2 w-[300px]  border border-white  rounded-lg"
                            onClick={() => handleAddToCart(item._id)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <button
                            className="bg-blue-600 hover:text-black text-white font-extralight py-2 w-[300px] border border-white  rounded-lg"
                            onClick={handleCart}
                          >
                            Add to Cart
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                

                {!showMore && filter.length > 7 && (
                  <div className="mt-8 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                      onClick={() => setShowMore(true)}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>You have no items yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
