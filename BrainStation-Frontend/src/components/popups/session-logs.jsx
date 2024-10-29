const SessionLogs = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      <div className="bg-black opacity-50 absolute inset-0" onClick={onClose} />
      <div className="bg-white overflow-hidden h-[40rem] w-full m-10 rounded-lg p-4 relative z-10">
        <button
          onClick={onClose}
          className="text-red-600 py-2 px-4 z-50 hover:bg-slate-300 rounded-lg absolute top-2 right-3"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default SessionLogs;
