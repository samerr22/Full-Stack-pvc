import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [form, setform] = useState([]);
  const [ItemDelete, setItemToDelete] = useState("");

  useEffect(() => {
    const fetchcat = async () => {
      try {
        const res = await fetch(`/api/supplier/getallout`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setform(data.Items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchcat();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/Inventry/formdelete/${ItemDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setform((prev) => prev.filter((cat) => cat._id !== ItemDelete));
        alert("deleted");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-slate-200">
      <div>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {form && form.length > 0 ? (
              <>
                {form.map((cat) => (
                  <div
                    key={cat._id}
                    className="w-[1000px] h-[400px]  mt-10 mb-10 rounded  shadow-xl "
                  >
                    <div className="px-6 py-4">
                      <div className="flex justify-center items-center mt-4 mb-4">
                        <h1 className="text-xl text-slate-700 font-serif whitespace-nowrap">
                          Product List
                        </h1>
                      </div>

                      <div className="flex justify-center break-words w-[950px] items-center mt-2">
                        <p className="text-gray-700 break-words w-[950px]  text-base">
                          {" "}
                          {cat.productlist}
                        </p>
                      </div>

                      <div className="flex justify-center items-center mt-6">
                        <div className="text-gray-700 text-xl font-serif  max-w-[200px] whitespace-nowrap break-words">
                         Requst Date:{moment(cat.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                      </div>
                      <div className="flex justify-center items-center ">
                        <div className="text-gray-700  font-serif whitespace-nowrap mt-3 text-xl max-w-[200px] break-words">
                          Required day:{cat.wantdate}
                        </div>
                      </div>

                      <div className="flex justify-center items-center mt-2  ">
                        <div className=" w-44 bg-opacity-50 rounded-3xl">
                          <div className="text-red-700  ml-5 underline text-2xl  whitespace-nowrap  max-w-[200px] break-words">
                            {cat.status}
                          </div>

                       


                        </div>
                        <span>
                      <Link
                    to={`/stock/${cat._id}`}
                    className="text-white hover:underline"
                  >
                    <button className="bg-slate-900  rounded-xl  w-20 h-8 hover:opacity-40">
                    Edit
                    </button>
                   
                  </Link>
                      </span>

                        
                        <span
                          onClick={() => {
                            setItemToDelete(cat._id);
                            handleDeleteUser();
                          }}
                          className="text-white hover:underline cursor-pointer"
                        >
                          <button className="bg-red-800  ml-10 rounded-xl w-20 h-8 hover:opacity-40">
                            Delete
                          </button>
                        </span>
                       
                      </div>
                    
                    </div>
                  </div>
                ))}
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
