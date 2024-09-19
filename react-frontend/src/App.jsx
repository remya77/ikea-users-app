import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const hostUrl = import.meta.env.PROD ?
    window.location.href : "http://localhost:8080/";

  const fetchUsers = async () => {
    const response = await fetch(`${hostUrl}api/users`);
    const usersToJson = await response.json();
    console.log(usersToJson)
    setUsers(usersToJson);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault()
    const response = await fetch(`${hostUrl}api/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: e.target.name.value, isAdmin: e.target.isAdmin.checked, jobTitle: e.target.jobTitle.value }),
    });
    const newUser = await response.json();

    setUsers([...users, newUser]);
  }

  const deleteUser = async (e) => {
    await fetch(`${hostUrl}api/user/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    await fetchUsers();
  }

  const updateUser = async(e)=>{
    const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}`,
    {
      method:"PUT",
      headers:{
        "Content-type": "application/json",
      },
      body:JSON.stringify({isAdmin: e.target.isAdmin.checked, jobTitle:e.target.jobTitle.value}),

    } );
    await response.json();
    await fetchUsers();
  }

  return (
    <>
      <h1>New User</h1>
      <form onSubmit={createUser}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="isAdmin">Is Admin</label>
        <input type="checkbox" name="isAdmin" />
        <label htmlFor="Job">Job</label>
        <input type="text" name="jobTitle" id="jobTitle" />
        <input type="submit" />
      </form>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Is Admin</th>
            <th>Job Title</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                <input
                  data-id={user.id}
                  type="checkbox"
                  checked={user.isAdmin} /></td>
              <td>{user.jobTitle}</td>
              <td>
                <button data-id={user.id} onClick={deleteUser}>Delete</button>
              </td>
              <td>
                <button data-id={user.id} onClick={updateUser}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App
