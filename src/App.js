import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [initId, setInitId] = useState(11);
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [lastName, setLastName] = useState("");
  const [popId,setPopId] = useState();

  const getUserDetails = async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.get(apiUrl);
    setUsers(response.data);
    setLoading(false);
  };

  const handleEdit = (userData) => {
    setName(userData.name.split(" ")[0]);
    setLastName(userData.name.split(" ")[1] || "");
    setEmail(userData.email);
    setWebsite(userData.website);
    setPopId(userData.id);
    setPopup(true);
  };
  const handleDelete = async (userId) => {
    const filteredUsers = users.filter((each) => each.id !== userId);
    setUsers(filteredUsers);
  };

  const nextButton = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevButton = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const onClickCancel = () =>{
    setPopup(false);
  }
  
  const onClickSave = () =>{

  }

  const addNewButton = async () => {
    const userData = {
      id: initId,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
    };

    setUsers((prev) => [...prev, userData]);
    setInitId((prev) => prev + 1);
  };

  const currentPageUsers = users.slice((currentPage - 1) * 5, currentPage * 5);
  const totalPages = Math.ceil(users.length / 5);
  const next = currentPage < totalPages;
  const previous = currentPage > 1;
  const checkPages =
    currentPage > totalPages && totalPages > 0 && setCurrentPage(totalPages);
  console.log(checkPages);
  console.log(users.length);
  return (
    <div className="App">
      <h1>User Management Dashboard</h1>
      <button onClick={addNewButton}>Add New User</button>
      {!loading && currentPageUsers.length > 0 && (
        <>
          <table border="2">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name.split(" ")[0]}</td>
                  <td>{user.name.split(" ")[1] || ""}</td>
                  <td>{user.email}</td>
                  <td>{user.website || "N/A"}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {previous && <button onClick={prevButton}>Prev</button>}
            <p>
              {currentPage} / {totalPages}
            </p>
            {next && <button onClick={nextButton}>Next</button>}
          </div>
        </>
      )}
      {popup && (
        <div className="popupOverlay">
          <div className="popupContent">
            <h4>Edit User Input</h4>
            <div className="pop-label">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            </div>
            <div className="pop-label">
              <label>lastName</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />
            </div>
            <div className="pop-label">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>
            <div className="pop-label">
              <label>website</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="input"
              />
            </div>

            <div className="actions">
              <button className="saveButton" onClick={() => onClickSave(popId)}>Save</button>
              <button className="cancelButton" onClick={onClickCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
