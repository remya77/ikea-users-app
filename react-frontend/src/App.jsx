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

  const deleteUser = async (e) => {
    await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    await fetchUsers();
  }

  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Is Admin</th>
            <th>Job Title</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App
