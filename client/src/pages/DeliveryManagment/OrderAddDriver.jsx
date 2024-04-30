import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



export default function SignUp() {
  const [formData, setFormData] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  console.log(formData)
  const {id} = useParams();


  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const res = await fetch(`/api/delivery/addriver/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }

      if (res.ok) {
        setErrorMessage(null);
        navigate(`/orderDriver`);
        alert("successfull")
      }
    } catch (error) {
        setErrorMessage("Something went wrong");
    }
  };



  const handlageChange = (e) => {
    const age = parseInt(e.target.value);
    if (isNaN(age) || age < 0 || age < 18 || age > 50) {
      setPublishError("Age must be a positive number between 18 and 50");
    } else {
      setFormData({ ...formData, age });
      setPublishError(null); // Clear error message if age is valid
    }
  };

  const handleContactChange = (e) => {
    const contact = e.target.value.trim();
    const contactPattern = /^[0-9]{10}$/;
  
    if (!contactPattern.test(contact)) {
      setPublishError("Contact number must be a 10-digit number");
    } else {
      setFormData({ ...formData, contact });
      setPublishError(null); // Clear error message if contact number is valid
    }
  };
  

  return (
    <div className=" ">
        
         <h1 className="text-5xl font-serif text-slate-700 whitespace-nowrap ml-96 mt-4">New Driver</h1>
      
       
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
       
        
          <div className="w-[550px] h-[500px] border rounded-xl shadow-xl">
        <div className="flex justify-center items-center mt-6">
          <form className="flex flex-col  gap-4" onSubmit={handleSubmit} >
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Drivername</h3>
              <input
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder=""
                id="Drivername"
                required
                onChange={handlchange}
              />
            </div>
            <div>
             <h3 className="font-semibold text-slate-400 ml-1">Age</h3>


              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder=""
                id="Age"
                maxLength={2}
                required
                onChange={handlageChange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Exprince</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder=""
                id="ExprinceD"
                maxLength={2}
              required
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Contact</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder=""
                id="Contact"
                maxLength={10}
            required
                onChange={handleContactChange}
              />
            </div>
            <button
              className=" bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
             
            >
             submit 
            </button>

            {publishError && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
              {publishError}
            </p>
          )}
           {errorMessage && (
            <p className="mt-5 text-red-600 bg-slate-600 bg-opacity-30 h-7 rounded-lg text-center ">
              {errorMessage}
            </p>
          )}
          
          </form>
          
         
         
        </div>
        </div>
      </div>
    </div>
  );
}

