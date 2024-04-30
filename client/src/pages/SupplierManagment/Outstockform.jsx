import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [form, setform] = useState([]);

  const [showMore, setShowMore] = useState(false);

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


  const handleStatusChange = async (FormmId, currentStatus) => {
    try {
      let newStatus;
      switch (currentStatus) {
        case "processing":
          newStatus = "Approval";
          break;
        case "Approval":
          newStatus = "Reject";
          break;
        case "reject":
          newStatus = "Processing";
          break;
        default:
          newStatus = "Processing"; // Default to "Processing" if status is not recognized
      }
      

      const res = await fetch(`/api/Inventry/adopp/${FormmId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setform(
          form.map((cat) => {
            if (cat._id === FormmId) {
              return { ...cat, status: newStatus };
            }
            return cat;
          })
        );
       
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
       <div className="flex justify-center items-center mt-10  gap-4">
              <Link to="/addvertisment">
              
                    <button className="w-40 h-10 bg-blue-700 text-white rounded-lg hover:opacity-50 text-md font-serif mb-8">
                    Advertisement
                    </button>
                    </Link>
                    <Link to="/supply">
              
                    <button className="w-40 h-10 bg-blue-700 text-white rounded-lg hover:opacity-50 text-md font-serif mb-8">
                    Supply Details
                    </button>
                    </Link>
                    </div>
      <div>
     
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {form && form.length > 0 ? (
              <>
                {form.slice(0, showMore ? form.length : 2).map((cat) => (
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
                          Request date:{cat.outofstockdate}
                        </div>
                      </div>
                      <div className="flex justify-center items-center ">
                        <div className="text-gray-700 font-serif whitespace-nowrap mt-3 text-xl max-w-[200px] break-words">
                          Required day:{cat.wantdate}
                        </div>
                      </div>

                      <div className="flex justify-center items-center mt-2 ">
                        <div className="text-red-700   whitespace-nowrap text-xl max-w-[200px] break-words">
                          <button className="bg-red-600 hover:opacity-90 rounded-lg w-40 text-white" onClick={() =>
                                    handleStatusChange(cat._id, cat.status)
                                  }>
                                 {cat.status}

                          </button>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {!showMore && form.length > 2 && (
                  <div className="mt-4 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
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
