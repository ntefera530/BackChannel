const CreateChatHeader = () => {
  return (
    <div className="border-b border-base-300 w-full px-6 py-4 flex items-center">
        <h2
            className="text-lg font-semibold text-base-content tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
        >
            New Chat
        </h2>
    </div>
  );
};

export default CreateChatHeader;