import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function SignUp() {
  const [formData, setFormData] = useState({ employee: "true" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(formData)

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Plese fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/employeManage');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleSalaryChange = (e) => {
    const Salary = e.target.value.trim();
    const salaryPattern = /^[0-9]+$/;
  
    if (!salaryPattern.test(Salary)) {
      setErrorMessage("Salary must be a string containing only numbers");
    } else {
      setFormData({ ...formData, Salary });
      setErrorMessage(null); // Clear error message if salary is valid
    }
  };
  

  


  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">UserName</h3>
              <input
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Username"
                id="username"
                onChange={handlchange}
              />
            </div>
            <div>
             <h3 className="font-semibold text-slate-400 ml-1">Password</h3>


              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Password</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Employe</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
               placeholder="Name"
                id="Name"
                onChange={handlchange}
                required
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Address</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Address"
                id="Adress"
                onChange={handlchange}
                required
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Phone Number</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Number"
                id="phone"
                maxLength={10}
                onChange={handlchange}
                required
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Iob Title</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Jobtitle"
                id="Jobtitle"
                
                onChange={handlchange}
                required
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Salary</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
              
                id="Salary"
                maxLength={10}
                onChange={handleSalaryChange}
              
              />
            </div>

            <select
          className="rounded-lg w-40"
          id="Gender"
          onChange={handlchange}
         
        >
            <option value="">select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>



            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Employee</h3>
              <input
               className=" bg-slate-100 p-3  border-none rounded-full"
                type="text"
                
                id="employee"
                value={formData.employee} // Set the value to formData.supplier
                readOnly

              />
            </div>
            <button
              className=" bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
              disabled={loading}
            >
              {
              loading ? (
                <>
                  
                  <sapn className="pl-3">Loading...</sapn>
                </>
              ) : (
                "Add New supplier"
              )}
            </button>
          
          </form>
         
          {errorMessage && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center " >
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
