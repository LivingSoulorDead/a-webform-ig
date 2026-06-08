import { useState } from "react";
import "../../App.css";
function Crud() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    gender: "",
  });
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
  e.preventDefault();

  if (
    formData.name === "" ||
    formData.phone === "" ||
    formData.email === "" ||
    formData.address === "" ||
    formData.city === "" ||
    formData.gender === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  if (editIndex !== null) {

    const updatedUsers = [...users];

    updatedUsers[editIndex] = formData;

    setUsers(updatedUsers);

    setEditIndex(null);

    alert("User Updated");

  } else {

    setUsers([...users, formData]);

    alert("User Added");
  }

  setFormData({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    gender: "",
  });
}
function handleEdit(index) {

  setFormData(users[index]);

  setEditIndex(index);
}
function handleUpdate() {
  if (pendingUser) {
    setUsers([...users, pendingUser]);
    setPendingUser(null);
  }
}
function handleDelete(index) {

  const filteredUsers = users.filter(
    (_, i) => i !== index
  );

  setUsers(filteredUsers);
}
  return (
  <div>

    <div className="form-box">

      <h1>User Details Form</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Enter Address"
          value={formData.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={formData.city}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">
          Submit
        </button>

      </form>
      
      <div className="table-box">
        <h1>Submitted Users</h1>
        <table>
          <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>City</th>
        <th>Gender</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>

      {
        users.map((user, index) => (
          <tr key={index}>

            <td>{user.name}</td>

            <td>{user.phone}</td>

            <td>{user.email}</td>

            <td>{user.city}</td>

            <td>{user.gender}</td>
            <td>

  <button
    onClick={() => handleEdit(index)}
  >
    Update
  </button>
<br></br>
<br>
</br>
  <button
    onClick={() => handleDelete(index)}
  >
    Delete
  </button>

</td>

          </tr>
        ))
      }

    </tbody>

  </table>

</div>

      </div>
      <br>
      </br>
      
    </div>
);
}
export default Crud;