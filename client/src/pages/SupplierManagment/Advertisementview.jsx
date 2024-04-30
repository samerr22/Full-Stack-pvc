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
        const res = await fetch(`/api/supplier/outstock`);
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


  

  return (
    <div className="">
      
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
                        Advertisement
                        </h1>
                      </div>

                      <div className="flex justify-center break-words w-[950px] items-center mt-2">
                        <p className="text-gray-700 break-words w-[950px]  text-base">
                          {" "}
                          {cat.desc}
                        </p>
                      </div>

                      <div className="flex justify-center items-center mt-6">
                        <div className="text-gray-700 text-xl  max-w-[200px] whitespace-nowrap break-words">
                          Contact Number:{cat.contactN}
                        </div>
                      </div>
                      <div className="flex justify-center items-center ">
                        <div className="text-gray-700 whitespace-nowrap mt-3 text-xl max-w-[200px] break-words">
                          Required Day:{cat.wantdate}
                        </div>
                      </div>

                          <div className="flex justify-center items-center mt-8">
                          <Link
                    to={`/Advertisment/${cat._id}`}
                    className="text-white hover:underline"
                  >
                    <button className="bg-slate-900 rounded-3xl w-20 h-10 hover:opacity-40">
                    submit 
                    </button>
                   
                  </Link>
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
