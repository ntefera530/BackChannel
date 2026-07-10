import React from 'react'

const CreateDmHeader = () => {
  return (
    <div className="border-b border-base-300 w-full px-6 h-16 flex items-center">
        <h2
            className="text-lg font-semibold text-base-content tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
        >
            New Direct Message
        </h2>
    </div>
  );
}

export default CreateDmHeader