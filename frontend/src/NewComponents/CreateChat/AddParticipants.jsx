import React from 'react'

const AddParticipants = ({participants, setParticipants}) => {
  return (
    <div>
        AddParticipants
        <input
            type="text"
            placeholder="Enter participant username"
            onKeyDown={(e) => {
                if(e.key === 'Enter' && e.target.value.trim() !== '') {
                    setParticipants([...participants, e.target.value.trim()]);
                    e.target.value = '';
                }
            }}
        />
        <div>
            {participants.map((participant, index) => (
                <div key={index}>{participant}</div>
            ))}
        </div>
        
    </div>
  )
}

export default AddParticipants