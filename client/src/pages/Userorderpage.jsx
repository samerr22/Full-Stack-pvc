import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import 'jspdf-autotable';

export default function OrderDriver() {
  const { currentUser } = useSelector((state) => state.user);
  const customerId = currentUser ? currentUser._id : null;
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setfilter] = useState([]);
  console.log("samer",orderDetailsList)

  // Fetch order details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/Inventry/getcurrent/${customerId}`);
        const data = await response.json();
        console.log(data);

        if (data.length > 0) {
          setOrderDetailsList(data);
        } else {
          setOrderDetailsList([]);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);


    //search funtion
    useEffect(() => {
      if (query.trim() === "") {
        // If the query is empty, display all data
        setfilter([...orderDetailsList]);
      } else {
        // If there's a query, filter the data
        const filteredData = orderDetailsList.filter(
          (order) =>
          order.name && order.name.toLowerCase().includes(query.toLowerCase())
        );
        setfilter(filteredData);
      }
    }, [query, orderDetailsList]);



      // Function to generate PDF report
      const generateReport = () => {
        const doc = new jsPDF();
      
        let yPos = 20;
      
        filter.forEach((order, index) => {
          doc.setFontSize(12);
          doc.text(`Order ${index + 1} Details`, 10, yPos);
      
          yPos += 10;
          doc.setFontSize(10);
          doc.text(`Phone Number: ${order.phoneN}`, 10, yPos);
          yPos += 10;
          doc.text(`Total Price: Rs. ${order.totalPrice}`, 10, yPos);
          yPos += 10;
          doc.text(`Number of Items: ${order.Length}`, 10, yPos);
          yPos += 10;
          doc.text(`User ID: ${order.customerId}`, 10, yPos);
          yPos += 10;
          doc.text(`Date: ${moment(order.updatedAt).format("YYYY-MM-DD hh:mm:ss a")}`, 10, yPos);
          yPos += 10;
          doc.text(`Address: ${order.address}`, 10, yPos);
          yPos += 10;
          doc.text(`Name: ${order.name}`, 10, yPos);
      
          yPos += 10;
          doc.text(`Driver Details`, 10, yPos);
          yPos += 10;
          doc.text(`DriverName: ${order.Drivername}`, 10, yPos);
          yPos += 10;
          doc.text(`Age: ${order.Age}`, 10, yPos);
          yPos += 10;
          doc.text(`Experience: ${order.ExprinceD}`, 10, yPos);
          yPos += 10;
          doc.text(`Contact: ${order.Contact}`, 10, yPos);
      
          yPos += 10;
          doc.text(`Items`, 10, yPos);
          yPos += 10;
      
          // Table Header
          const headers = ["Item Name", "Price", "Quantity"];
          const tableData = order.Items.map((item) => [item.name, `Rs.${item.price}`, item.quantity]);
          
          doc.autoTable({
            startY: yPos,
            head: [headers],
            body: tableData,
            theme: 'plain'
          });
      
          yPos = doc.autoTable.previous.finalY + 20;
        });
      
        doc.save("order_report.pdf");
      };
      

 

  return (
    <div>
      <div className="h-[600px] relative">
        <div className="absolute top-0 left-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
          <div>
            <div className="ml-8 mt-7 mb-10 flex justify-center items-center">
              <form>
                <input
                  type="text"
                  placeholder="Search... "
                  className=" w-[200px=] h-8 rounded-lg  shadow-lg"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
             
            </div>
            <div className="flex justify-center items-center mt-2 mb-2">
            <button
                  className="ml-2 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
                  onClick={(e) => {
                    e.preventDefault();
                    generateReport();
                  }}
                > GenerateReport</button>

            </div>
           
            <div className=" flex justify-center items-center mt-2 mb-4 ">
              <h1 className="font-serif text-4xl text-slate-700">Order History</h1>
            </div>
            

            <div className="max-h-[400px] overflow-y-auto">
                <div></div>
              {filter && filter.length > 0 ? (
                filter.map((order, index) => (
                  <div
                    key={index}
                    className="  bg-opacity-20  h-[550px] w-[1400px] rounded-lg border shadow-lg bg-slate-500 mb-14"
                  >
                    <h2 className="text-xl ml-4 font-serif">
                      Order {index + 1} Details
                    </h2>

                    <div className="flex justify-center items-center ">
                      <p className="font-serif text-lg">Phone Number:</p>
                      <p className="ml-5 font-serif text-black">
                        {order.phoneN}
                      </p>
                    </div>

                    <div className="flex justify-center items-center ">
                      <p className="font-serif text-lg">Total Price: </p>
                      <p className="ml-5"> Rs. {order.totalPrice}</p>
                    </div>

                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">Number of Items: </p>
                      <p className="ml-5"> {order.Length}</p>
                    </div>

                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">User ID: </p>
                      <p className="ml-5"> {order.customerId}</p>
                    </div>

                    <div className="flex justify-center items-center ">
                      <p className="font-serif text-lg">Date: </p>
                      <p className="ml-5">
                        {moment(order.updatedAt).format("YYYY-MM-DD hh:mm:ss a")}
                      </p>
                    </div>

                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">Address: </p>
                      <p className="ml-5"> {order.address}</p>
                    </div>

                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">Name: </p>
                      <p className="ml-5"> {order.name}</p>
                    </div>

                    <div className="flex justify-center items-center">
                      <p className="font-serif text-xl">Driver Details </p>
                     
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="font-serif  text-red-700 text-sm">Wait few time</p>
                     
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">DriverName: </p>
                      <p className="ml-5"> {order.Drivername}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">Age: </p>
                      <p className="ml-5"> {order.Age}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">Exprince: </p>
                      <p className="ml-5"> {order.ExprinceD}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">Contact: </p>
                      <p className="ml-5"> {order.Contact}</p>
                    </div>


                    <div>
                      <h2 className="text-xl font-serif ml-8">Items</h2>
                      {order.Items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <div className="flex  ml-10 gap-4">
                            <div className="font-serif text-sm mb-2 text-black truncate w-32">
                              {item.name}
                            </div>
                            <p className="font-serif text-black text-sm">
                              Rs.{item.price}
                            </p>
                            <p className="text-black font-serif text-sm">
                              Order Items-{item.quantity}
                            </p>
                            
                          </div>
                          <hr className="h-1 bg-slate-700 w-full" />
                        </div>
                      ))}
                    </div>
                    
                  
                  </div>
                ))
              ) : (
                <p className="flex justify-center items-center">
                  No orders found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
