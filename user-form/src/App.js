import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from "react";
import Table from './Components/Table';
import "./Components/Table.css";

const initValue = {
    username: "",
    age: 0,
    address: "",
    salary:0,
    isMarried: false,
    file:"",
}

function App() {

  const [formData, setFormData] = useState([initValue]);
  const [datas, setDatas] = useState(initValue);
  const [show, SetShow] = useState(false);
  const [page,setPage] = useState(1)
  const uploadRef = useRef(null);

  useEffect(() => {
    getData();
    console.log("useEffect")
  },[page],[formData])

  function getData() {
        fetch(`http://localhost:3002/table?_page=${page}&_limit=5`)
            .then((data) => data.json())
            .then((data) => {
                console.log("userData", data);
              setFormData(data);
              SetShow(true);
            });
    console.log(formData,"check");
    }
  
   const handleChange = (e) => { 
        const { name, value, type, checked } = e.target;
        
      
      setDatas({...datas,[name]: type === "checkbox" ? checked : value });
        
        
    };

    const handleSubmit = (e) => {

      e.preventDefault();
      
      console.log(datas);
      
                fetch("http://localhost:3002/table", {
                    method: "POST",
                    body: JSON.stringify(datas),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(() => {
                  getData();
                }
                );
      setDatas(initValue);
    }
  
  const handleDelete = (id) => {
      
        fetch(`http://localhost:3002/table/${id}`, {
            method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(() => {
                  getData();
                }
                );
  }
  
  const handleSortLowtoHigh = ()=>{
     fetch(`http://localhost:3002/table?_sort=salary&_order=asc`)
            .then((data) => data.json())
            .then((data) => {
                console.log("userData", data);
              setFormData(data);
              SetShow(true);
            });
  
  }
   const handleSortHighToLow = ()=>{
     fetch(`http://localhost:3002/table?_sort=salary&_order=desc`)
            .then((data) => data.json())
            .then((data) => {
                console.log("userData", data);
              setFormData(data);
              SetShow(true);
            });
   }
  
  const handleFilter = (e) => {
    console.log(e.target.value, "filter");
    setPage(1);
    fetch(`http://localhost:3002/table?Department=${e.target.value}`)
            .then((data) => data.json())
            .then((data) => {
                console.log("userData", data);
              setFormData(data);
              SetShow(true);
            });
  }
  
  return (
    <div className="App">
      <h1>Users Details</h1>
      <form onSubmit={handleSubmit}>
                 <input type="text" name="username" onChange={handleChange} placeholder="Username" /><br/>
        <input type="Number" name="age" onChange={handleChange} placeholder="age" /><br />
         <input type="text" name="address" onChange={handleChange} placeholder="Address" /><br/>
        
         <select onChange={handleChange} name="Department">
                    <option value="It">It</option>
                    <option value="Finance">Finance</option>
                    <option value="Testing">Testing</option>
                     <option value="Development">Development</option>
        </select>
        
         <input type="Number" name="salary" onChange={handleChange} placeholder="Salary" /><br/>

                are you Married: {" "}  <input onChange={handleChange}  type="checkbox" name="isMarried" /><br />
               Profile Photo:-  <input type="file" ref={uploadRef} onChange={ handleChange} name="file"/>
                <input type="submit" value="submit" />
      </form>

      <div>
        <h4>Filters and Sort</h4>
          <select onChange={handleFilter} name="Department">
                    <option value="It">It</option>
                    <option value="Finance">Finance</option>
                    <option value="Testing">Testing</option>
                     <option value="Development">Development</option>
        </select>
        <button onClick={handleSortLowtoHigh}>Sort High to Low</button>
         <button onClick={handleSortHighToLow}>Sort Low to High</button>
      </div>
            <div className="table">
            <table style={{
                      border:"1px solid black"
                       }}>
                <tr>
                    <th className="rowBox">Name</th>
                    <th className="rowBox">Age</th>
                    <th className="rowBox">Address</th>
                    <th className="rowBox">Department</th>
                    <th className="rowBox">Salary</th>
                    <th className="rowBox">Profile Photo</th>
                    <th className="rowBox">Marital Status</th>
                    <th className="rowBox">Delete Option</th>
                </tr>
                </table>
               {console.log("checking data", formData)}
                 
                  {
        
                formData.map((e) => (
                    <div
                    key={e.id}>
                    <table style={{
                      border:"1px solid black"
                       }}>
                    
                          
                         <tr >
                        <td className="rowBox">{ e.username}</td>
                          <td className="rowBox">{ e.age}</td>
                        <td className="rowBox">{e.address}</td>
                        <td className="rowBox">{e.Department}</td>
                        <td className="rowBox">{e.salary}</td>
                        <td className="rowBox"><img src={e.file}></img>
                        </td>
                        <td className="rowBox">{e.isMarried ? "Yes" : "No"}</td>
                        <td className="rowBox"><button onClick={() => {
                          handleDelete(e.id);
                         }}>Delete</button></td>
                         </tr>
                      </table>
                     </div>
                ))
            }
        <button onClick={() => {
          setPage(page - 1);
        }}>Previous</button>
         <button onClick={() => {
          setPage(page + 1);
            }}>Next</button> 
        </div> 
    </div>
          );
}

export default App;
