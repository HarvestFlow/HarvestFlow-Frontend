import React from 'react';
import ReactDOM from 'react-dom';
import SideNavBar from './SideNavBar';

const Composant = () => {
  // Exemple de données utilisateurs
  const usersData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Guest' },
  ];

  const adminsData = [
    { id: 1, name: 'Admin One', email: 'admin1@example.com', role: 'Admin' },
    { id: 2, name: 'Admin Two', email: 'admin2@example.com', role: 'Admin' },
  ];

  const guestsData = [
    { id: 1, name: 'Guest One', email: 'guest1@example.com', role: 'Guest' },
    { id: 2, name: 'Guest Two', email: 'guest2@example.com', role: 'Guest' },
  ];

  return (
    <div>
      <div style={{ padding: '20px', marginTop:'20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2>Utilisateurs</h2>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2>Admins</h2>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
              </tr>
            </thead>
            <tbody>
              {adminsData.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2>Guests</h2>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
              </tr>
            </thead>
            <tbody>
              {guestsData.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Composant;
