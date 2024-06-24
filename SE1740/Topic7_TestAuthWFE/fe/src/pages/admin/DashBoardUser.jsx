import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure you have this package installed
import { toast } from "react-hot-toast";
import { UserContext } from "../../App";

const DashBoardUser = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("seller");
  const { userAuth, setUserAuth } = useContext(UserContext);

  const axioJWT = axios.create();

  // Add Axios interceptor
  axioJWT.interceptors.request.use(
    async (config) => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        let date = new Date();
        if (decodedToken.exp < date.getTime() / 1000) {
          console.log("Token expired");
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("accessToken");
          setUserAuth({ accessToken: null, user: null });
          window.location.href = "/signin";
        }
        // Set the token in the header
        config.headers["token"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      fetchUsers(token);
    }
  }, []);
  const fetchUsers = async (token) => {
    try {
      const response = await axioJWT.get("http://localhost:9999/api/user");
      setUsers(response.data);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");

      const newUser = { email, password, username, role };
      toast.success(newUser.role);
      await axioJWT.post("http://localhost:9999/api/user/create", newUser);
      toast.success("User added successfully");
      fetchUsers(token);
    } catch (error) {
      toast.error("Error adding user");
    }
  };

  if (!userAuth || !userAuth.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Username</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {userAuth.user.role.name === "admin" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Add New User</h2>
          <form onSubmit={handleAddUser}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 border rounded" required>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
              Add User
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DashBoardUser;
