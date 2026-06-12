import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [users] = useState([
    { _id: "u1", name: "Arun Kumar",    email: "arun.kumar@gmail.com" },
    { _id: "u2", name: "Priya Sharma",  email: "priya.sharma@gmail.com" },
    { _id: "u3", name: "Rahul Menon",   email: "rahul.menon@gmail.com" },
    { _id: "u4", name: "Divya Nair",    email: "divya.nair@gmail.com" },
  ]);

  const [pets, setPets] = useState([
    { _id: "p1", name: "Biscuit",  breed: "Golden Retriever", category: "Dog",  image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100" },
    { _id: "p2", name: "Milo",     breed: "Pug",             category: "Dog",  image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=100" },
    { _id: "p3", name: "Whiskers", breed: "Persian",         category: "Cat",  image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100" },
    { _id: "p4", name: "Luna",     breed: "Siamese",         category: "Cat",  image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=100" },
    { _id: "p5", name: "Oliver",   breed: "African Grey",    category: "Bird", image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=100" },
    { _id: "p6", name: "Bruno",    breed: "German Shepherd", category: "Dog",  image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=100" },
  ]);

  const [adoptions] = useState([
    { _id: "a1", userName: "Arun Kumar",  email: "arun.kumar@gmail.com",  status: "pending" },
    { _id: "a2", userName: "Priya Sharma", email: "priya.sharma@gmail.com", status: "pending" },
    { _id: "a3", userName: "Rahul Menon",  email: "rahul.menon@gmail.com",  status: "pending" },
  ]);

  const [sells] = useState([
    { _id: "s1", petName: "Coco",   ownerName: "Meera Krishnan", status: "pending" },
    { _id: "s2", petName: "Shadow", ownerName: "Karthik Raja",   status: "pending" },
    { _id: "s3", petName: "Mango",  ownerName: "Vijay Anand",    status: "pending" },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPet, setNewPet] = useState({ name: "", breed: "", category: "Dog", image: "" });

  const handleAddPet = () => {
    if (!newPet.name.trim() || !newPet.breed.trim()) {
      alert("Name and Breed are required.");
      return;
    }
    const id = "p" + Date.now();
    const image = newPet.image.trim() ||
      (newPet.category === "Dog"  ? "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100" :
       newPet.category === "Cat"  ? "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100" :
                                    "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=100");
    setPets((prev) => [...prev, { _id: id, ...newPet, image }]);
    setNewPet({ name: "", breed: "", category: "Dog", image: "" });
    setShowAddForm(false);
  };

  const revenue = sells.length * 2500;

  const handleDeletePet = (id) => {
    if (!window.confirm("Delete this pet?")) return;
    setPets((prev) => prev.filter((pet) => pet._id !== id));
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
          <button onClick={() => setShowAddForm(true)}>➕ Add Pet</button>
          <button>📊 Reports</button>
          <button>👥 Users</button>
          <button>⚙ Settings</button>
        </div>

        {/* ADD PET MODAL */}

        {showAddForm && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
            <div style={{ background:"#fff", borderRadius:"12px", padding:"32px", width:"100%", maxWidth:"420px", boxShadow:"0 8px 32px rgba(0,0,0,0.2)" }}>
              <h3 style={{ marginBottom:"20px" }}>➕ Add New Pet</h3>

              <input
                type="text"
                placeholder="Pet Name *"
                className="search-input"
                style={{ width:"100%", marginBottom:"12px", display:"block" }}
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
              />

              <input
                type="text"
                placeholder="Breed *"
                className="search-input"
                style={{ width:"100%", marginBottom:"12px", display:"block" }}
                value={newPet.breed}
                onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
              />

              <select
                className="search-input"
                style={{ width:"100%", marginBottom:"12px", display:"block" }}
                value={newPet.category}
                onChange={(e) => setNewPet({ ...newPet, category: e.target.value })}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="text"
                placeholder="Image URL (optional)"
                className="search-input"
                style={{ width:"100%", marginBottom:"20px", display:"block" }}
                value={newPet.image}
                onChange={(e) => setNewPet({ ...newPet, image: e.target.value })}
              />

              <div style={{ display:"flex", gap:"10px" }}>
                <button className="approve-btn" onClick={handleAddPet}>Add Pet</button>
                <button className="reject-btn" onClick={() => { setShowAddForm(false); setNewPet({ name:"", breed:"", category:"Dog", image:"" }); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

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