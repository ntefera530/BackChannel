import React, {useState, useEffect} from 'react'
import { useUser } from '../../contexts/UserContext';
import { set } from 'date-fns';

const DeleteTimerSettings = () => {
    const [selectedRadio, setSelectedRadio] = useState(null);

    const { deleteTimerSeconds, updateUserSettings } = useUser();


    useEffect(() => {
      setSelectedRadio(deleteTimerSeconds);
    }, []);
    
    const handleRadioChange = (event) => {
      const parsedValue = event.target.value === "null" ? null : Number(event.target.value);
      setSelectedRadio(parsedValue);
    };
    
    const saveDeleteTimerSetting = () => {
      console.log('Saving delete timer setting: ', selectedRadio);
      updateUserSettings(selectedRadio);
    }

  const options = [
    { label: "Never", value: null },
    { label: "30 Seconds", value: 30 },
    { label: "1 Minute", value: 60 },
    { label: "5 Minutes", value: 300 },
    { label: "30 Minutes", value: 1800 },
    { label: "1 Hour", value: 3600 },
  ];

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Delete Message Timer</h2>
      {options.map((option) => (
        <label key={option.value}>
        <input
          type="radio"
          name="autoLock"
          value={option.value === null ? "null" : option.value}
          checked={selectedRadio === option.value}
          onChange={handleRadioChange}
        />
      {option.label}
  </label>
))}

      <div className="mt-5">
        <button 
          className="btn btn-primary"
          onClick={saveDeleteTimerSetting}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default DeleteTimerSettings