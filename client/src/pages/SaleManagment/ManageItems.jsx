import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [ItemDelete, setItemToDelete] = useState("");
  console.log("sameea", items);

  useEffect(() => {
    const fetchitems = async () => {
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

    fetchitems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `/api/Sale/Pdelete/${ItemDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== ItemDelete));
        alert("deleted")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="h-[600px] relative">
        
        <div className="flex justify-center items-center mt-4 mb-2">
            <h1 className="font-serif text-slate-700 text-3xl ml-20 mb-6 mt-4">
                Manage Product 
            </h1>
        </div>


      <div className="w-[1200px] h-[500px]  ml-48 rounded-lg border shadow-lg shadow-slate-300 border-white bg-slate-100">

<div className="max-h-96 overflow-y-auto">
  <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
    {currentUser.salesmanger ? (
      <>
        <table className="w-full divide-y divide-green-500 shadow-md">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Items name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Edit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {items.map((item) => (
              <tr
                key={item._id}
                className="bg-black bg-opacity-50 text-white dark:border-black dark:bg-black"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                 Rs.{item.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.image}
                    className="w-20 h-2s0 object-cover bg-gray-500 rounded-xl"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.quantity}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/update/${item._id}`}
                    className="text-white hover:underline"
                  >
                    <button className="bg-slate-900 rounded-3xl w-20 h-10 hover:opacity-40">
                    Edit
                    </button>
                   
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    onClick={() => {
                      setItemToDelete(item._id);
                      handleDeleteUser();
                    }}
                    className="text-white hover:underline cursor-pointer"
                  >
                    <button className="bg-red-800  rounded-3xl w-20 h-10 hover:opacity-40">
                    Delete
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <p>You have no users yet!</p>
    )}
  </div>
</div>
</div>
        
       </div>
    </div>
  );
}

