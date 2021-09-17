

function Table({ formData, handleDelete }) {
    
    console.log(formData,"Hiii");
    return (
       
        <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Marital Status</th>
                </tr>
               
                {
                    formData.map((e) => {
                         <tr>
                       <td >{ e.username}</td>
                          <td>{ e.age}</td>
                        <td>{e.address}</td>
                        <td>{e.Department}</td>
                        <td>{e.salary}</td>
                        <td>{e.isMarried ? "Yes" : "No"}</td>
                        <td><button onClick={() => {
                          handleDelete(e.id);
                         }}>Delete</button></td>
                          </tr>
                  })
                }
             </table>
        </div>
    );
}

export default Table;