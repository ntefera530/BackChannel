const ChatNameInput = ({ chatName, setChatName }) => {
  return (
    <div className="px-6 mb-5">
        <label className="block text-xs font-medium uppercase tracking-widest text-base-content/50 mb-2">
            Chat Name
        </label>
        <input
            type="text"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            placeholder="Enter a name..."
            className="input input-bordered w-full"
        />
    </div>
  );
};

export default ChatNameInput;