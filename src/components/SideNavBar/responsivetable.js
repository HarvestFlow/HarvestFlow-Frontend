import React from "react";
import Sidebar from "./SideNavBar";
import Navbar from "./navbar";

const ResponsiveTable = () => {
  const data = [
    { id: 1, name: "Alice Johnson", role: "Admin", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", role: "Editor", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", role: "Viewer", email: "charlie@example.com" },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar en haut */}
      <Navbar />

      {/* Contenu principal avec Sidebar + Tableau */}
      <div className="flex flex-1">
        {/* Sidebar : 3 colonnes */}
        <div className="w-1/4 bg-gray-100 p-4">
          <Sidebar />
        </div>

        {/* Tableau : reste de l'écran */}
        <div className="w-3/4 p-4 mt-" >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md">
              <thead className="bg-green-200 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-6 py-4 text-gray-800">{user.id}</td>
                    <td className="px-6 py-4 text-gray-800">{user.name}</td>
                    <td className="px-6 py-4 text-gray-800">{user.role}</td>
                    <td className="px-6 py-4 text-gray-800">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTable;
