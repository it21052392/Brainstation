const UserCard = ({ profilePhoto, userName, onClick }) => {
  return (
    <div
      className="flex justify-between items-center py-8 px-12 my-4 min-h-20 bg-white rounded-xl hover:brightness-95 transition-all duration-300"
      style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center gap-4">
        {/* Display profile photo */}
        <img src={profilePhoto} alt={`${userName}'s profile`} className="w-10 h-10 rounded-full object-cover" />
        <p>{userName}</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={onClick}>
        View
      </button>
    </div>
  );
};

export default UserCard;
