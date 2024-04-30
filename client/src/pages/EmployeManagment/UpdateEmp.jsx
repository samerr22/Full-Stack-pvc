import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



export default function SignUp() {
  const [formData, setFormData] = useState({ employee: "true" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { EmpId } = useParams();

  console.log(formData)


  useEffect(() => {
    try {
      const fetchStudents = async () => {
        const res = await fetch(`/api/Empl/employee?itemId=${EmpId}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
        }
        if (res.ok) {
          const selected = data.find((item) => item._id === EmpId);
          if (selected) {
            setFormData(selected);
          }
        }
      };
      fetchStudents();
    } catch (error) {
      console.log(error.message);
    }
  }, [EmpId]);






  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }

      if (res.ok) {
        setErrorMessage(null);
        alert("succesfull")
        navigate(`/employeManage`);
      }
    } catch (error) {
        setErrorMessage("Something went wrong");
    }
  };


  const handleSalaryChange = (e) => {
    const Salary = e.target.value.trim();
    const salaryPattern = /^[0-9]+$/;
  
    if (Salary === "") {
      // If the input field is empty, clear the Salary value
      setFormData((prevFormData) => ({
        ...prevFormData,
        Salary: ""
      }));
      setErrorMessage(null); // Clear any existing error message
    } else if (!salaryPattern.test(Salary)) {
      setErrorMessage("Salary must be a string containing only numbers");
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Salary
      }));
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
                value={formData.username}
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
                value={formData.email}
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
                value={formData.Name}
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
                value={formData.Adress}
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
                value={formData.phone}
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
                value={formData.Jobtitle}
                required
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Salary</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Number"
                id="Salary"
                maxLength={10}
                onChange={handleSalaryChange}
                value={formData.Salary}
                
              />
            </div>

            <select
          className="rounded-lg w-40"
          id="Gender"
          onChange={handlchange}
          value={formData.Gender}
         
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
                "Update supplier"
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
