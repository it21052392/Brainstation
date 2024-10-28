import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useParams } from "react-router-dom";
import { Loader } from "@/components";
import ModuleUserCard from "@/components/cards/module-user-card";
import { enrollUser, getOtherUsers, getUsersByModule, unenrollUser } from "@/service/UserService";

const ModuleUsers = () => {
  const { moduleId } = useParams();
  const [users, setUsers] = useState([]);
  const [filterEnrolled, setFilterEnrolled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [filterEnrolled]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = filterEnrolled
        ? await getUsersByModule(moduleId) // Fetch enrolled users
        : await getOtherUsers(moduleId); // Fetch all users
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollUser = async (userId) => {
    try {
      await enrollUser(userId, moduleId);
      fetchUsers(); // Refresh user list after enrollment
    } catch (error) {
      console.error("Error enrolling user:", error);
    }
  };

  const handleUnenrollUser = async (userId) => {
    try {
      await unenrollUser(userId, moduleId);
      fetchUsers(); // Refresh user list after unenrollment
    } catch (error) {
      console.error("Error unenrolling user:", error);
    }
  };

  return (
    <div className="p-4 px-6 h-[calc(100%-100px)]">
      <div className="flex justify-between items-center">
        <h1 className="font-inter font-bold text-2xl">Module Users</h1>
        <div className="flex items-center">
          <label className="mr-2 font-semibold">Show:</label>
          <button
            className={`px-4 py-2 rounded ${filterEnrolled ? "bg-blue-900 text-white" : "bg-gray-200"}`}
            onClick={() => setFilterEnrolled(true)}
          >
            Enrolled
          </button>
          <button
            className={`ml-2 px-4 py-2 rounded ${!filterEnrolled ? "bg-blue-900 text-white" : "bg-gray-200"}`}
            onClick={() => setFilterEnrolled(false)}
          >
            Unenrolled
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-8 mx-20">
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            autoHeightMax={"calc(100vh - 220px)"}
            thumbMinSize={30}
            universal={true}
            className="rounded-lg"
          >
            {users.length > 0 ? (
              users.map((user) => (
                <ModuleUserCard
                  key={user._id}
                  user={user}
                  showEnrollButton={!filterEnrolled}
                  onEnroll={() => handleEnrollUser(user._id)}
                  onUnenroll={() => handleUnenrollUser(user._id)}
                  filterEnrolled={filterEnrolled}
                />
              ))
            ) : (
              <div className="text-center text-lg font-inter text-gray-400">No users found.</div>
            )}
          </Scrollbars>
        </div>
      )}
    </div>
  );
};

export default ModuleUsers;
