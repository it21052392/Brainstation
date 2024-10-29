import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "@/components/cards/user-card";
import ScrollView from "@/components/common/scrollable-view";
import FilterIcon from "@/components/icons/filter-icon";
import SearchIcon from "@/components/icons/search-icon";
import { getAllUsers } from "@/service/UserService";

// Fetch users dynamically from the backend

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(); // Fetch users from the service
        const usersData = response.data.docs; // Access user data from response
        setUsers(usersData);
        setFilteredUsers(usersData); // Display all users initially
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const navToUserProfile = (userId) => {
    navigate(`/admin-portal/profile/${userId}`); // Navigate to user profile with dynamic user ID
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter users based on the search query
    const filtered = users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredUsers(filtered);
  };

  return (
    <div className="p-4 px-6">
      {/* Search Bar */}
      <div className="flex justify-center">
        <div
          className="flex justify-center border rounded-full h-14"
          style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="flex items-center px-3 py-2 min-w-80" style={{ width: "500px" }}>
            <div
              className="flex justify-between items-center border rounded-full w-full h-8 bg-neutral-200"
              style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
            >
              <SearchIcon />
              <p className="text-xl mx-2 text-slate-700">|</p>
              <input
                type="text"
                id="userName"
                placeholder="Search Users..."
                value={searchQuery}
                onChange={handleSearch} // Update search input
                className="flex-grow placeholder-slate-600 bg-neutral-200 focus:outline-none"
              />
            </div>
            <FilterIcon className="ml-2 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="mt-4">
        <ScrollView initialMaxHeight="12rem">
          <div className="mx-20">
            {filteredUsers.map((user) => (
              <UserCard
                key={user._id} // Assuming _id is the unique identifier
                profilePhoto={user.profilePhoto || "https://cdn-icons-png.freepik.com/512/219/219966.png"} // Fallback profile photo
                userName={user.name}
                onClick={() => navToUserProfile(user._id)} // Pass user ID to navigate
              />
            ))}
          </div>
        </ScrollView>
      </div>
    </div>
  );
};

export default Users;
