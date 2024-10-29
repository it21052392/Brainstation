const ProfileLayout = ({ profilePhoto, userName, email, organization, onClick }) => {
  return (
    <div className="p-4 px-6">
      <div className="flex flex-col justify-center items-center">
        <img
          src={profilePhoto}
          alt={`${userName}'s profile`}
          className="w-40 h-40 my-5 rounded-full border border-2 border-blue-900 object-cover"
        />
        <h2 className="text-2xl font-semibold">{userName}</h2>
      </div>
      <div className="flex justify-center my-12">
        <div className="w-6/12 py-4 px-16 rounded-lg" style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}>
          <p>
            <span className="font-bold inline-block w-28">User Name</span>: {userName}
          </p>
          <p>
            <span className="font-bold inline-block w-28">Email</span>: {email}
          </p>
          <p>
            <span className="font-bold inline-block w-28">Organization</span>: {organization}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-between gap-4 items-center w-6/12">
          <div
            className="py-12 px-6 rounded-lg min-h-80 w-80 cursor-pointer"
            style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
            onClick={onClick}
          >
            <h2 className="text-3xl font-bold text-center">
              Engagement <br /> Metrics
            </h2>
            <p className="mt-7 text-lg">Includes Activity history, Session history</p>
          </div>
          <div
            className="py-12 px-6 rounded-lg min-h-80 w-80 cursor-pointer"
            style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
            onClick={""}
          >
            <h2 className="text-3xl font-bold text-center">
              Academic <br /> Performance
            </h2>
            <p className="mt-7 text-lg">Includes Focus levels, Quiz details, Tasks details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
