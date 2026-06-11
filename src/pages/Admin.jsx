import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [sells, setSells] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get(
        "http://https://petstore-backend-2.onrender.com/api/admin/users"
      );

      const petsRes = await axios.get(
        "http://https://petstore-backend-2.onrender.com/api/admin/pets"
      );

      const adoptionsRes = await axios.get(
        "http://https://petstore-backend-2.onrender.com/api/admin/adoptions"
      );

      const sellsRes = await axios.get(
        "http://https://petstore-backend-2.onrender.com/api/admin/sells"
      );

      setUsers(usersRes.data);
      setPets(petsRes.data);
      setAdoptions(adoptionsRes.data);
      setSells(sellsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const revenue = sells.length * 2500;
      const handleDeletePet = async (id) => {
  try {
    const confirmDelete = window.confirm(
      "Delete this pet?"
    );

    if (!confirmDelete) return;

    await axios.delete(
      `http://https://petstore-backend-2.onrender.com/api/admin/pets/${id}`
    );

    fetchData();

    alert("Pet deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="admin-page">
      <div className="container py-4">

        {/* HEADER */}

        <div className="admin-header">
          <div>
            <h1>🐾 Pet Store Admin Dashboard</h1>
            <p>
              Welcome back Admin. Monitor your pet
              store activities from one place.
            </p>
          </div>

          <div className="header-actions">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />

            <Link
              to="/"
              className="btn-home"
            >
              Back To Site
            </Link>
          </div>
        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">
            <h5>👤 Users</h5>
            <h2>{users.length}</h2>
            <p>Total Registered</p>
          </div>

          <div className="stat-card">
            <h5>🐶 Pets</h5>
            <h2>{pets.length}</h2>
            <p>Available Pets</p>
          </div>

          <div className="stat-card">
            <h5>🏠 Adoptions</h5>
            <h2>{adoptions.length}</h2>
            <p>Total Requests</p>
          </div>

          <div className="stat-card">
            <h5>💰 Revenue</h5>
            <h2>₹{revenue}</h2>
            <p>Estimated Revenue</p>
          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="quick-actions">
          <button>➕ Add Pet</button>
          <button>📊 Reports</button>
          <button>👥 Users</button>
          <button>⚙ Settings</button>
        </div>

        {/* OVERVIEW */}

        <div className="overview-grid">

          <div className="overview-card">
            <h3>🐕 Pet Categories</h3>

            <div className="category-item">
              Dogs
              <span>
                {
                  pets.filter(
                    (p) =>
                      p.category === "Dog"
                  ).length
                }
              </span>
            </div>

            <div className="category-item">
              Cats
              <span>
                {
                  pets.filter(
                    (p) =>
                      p.category === "Cat"
                  ).length
                }
              </span>
            </div>

            <div className="category-item">
              Birds
              <span>
                {
                  pets.filter(
                    (p) =>
                      p.category === "Bird"
                  ).length
                }
              </span>
            </div>

            <div className="category-item">
              Others
              <span>
                {
                  pets.filter(
                    (p) =>
                      p.category === "Other"
                  ).length
                }
              </span>
            </div>

          </div>

          <div className="overview-card">
            <h3>🔔 Notifications</h3>

            <div className="notification">
              New adoption requests:
              {adoptions.length}
            </div>

            <div className="notification">
              Sell requests:
              {sells.length}
            </div>

            <div className="notification">
              Registered users:
              {users.length}
            </div>

            <div className="notification">
              Pets available:
              {pets.length}
            </div>
          </div>

        </div>

        {/* PETS */}

        <div className="table-card">
          <h3>🐾 Pet Listings</h3>

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {pets.slice(0, 8).map((pet) => (
                <tr key={pet._id}>
                  <td>
                    <img
                      src={
                        pet.image ||
                        "https://via.placeholder.com/60"
                      }
                      alt=""
                      className="pet-img"
                    />
                  </td>

                  <td>{pet.name}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.category}</td>
                  <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeletePet(pet._id)}>
                    Delete
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
        {/* ADOPTIONS */}

        <div className="table-card">
          <h3>🏠 Adoption Requests</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {adoptions.map((item) => (
                <tr key={item._id}>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>

                  <td>
                    <button className="approve-btn">
                      Approve
                    </button>

                    <button className="reject-btn">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SELL REQUESTS */}

        <div className="table-card">
          <h3>💰 Sell Requests</h3>

          <table>
            <thead>
              <tr>
                <th>Pet</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {sells.map((item) => (
                <tr key={item._id}>
                  <td>{item.petName}</td>
                  <td>{item.ownerName}</td>
                  <td>{item.status}</td>

                  <td>
                    <button className="approve-btn">
                      Approve
                    </button>

                    <button className="reject-btn">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* USERS */}

        <div className="table-card">
          <h3>👥 Recent Users</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {users.slice(0, 10).map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ACTIVITY */}

        <div className="activity-card">
          <h3>📈 Recent Activity</h3>

          <ul>
            <li>
              New user registrations:
              {users.length}
            </li>

            <li>
              Adoption requests:
              {adoptions.length}
            </li>

            <li>
              Sell requests:
              {sells.length}
            </li>

            <li>
              Total pets:
              {pets.length}
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Admin;