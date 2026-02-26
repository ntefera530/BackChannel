import React, {useState} from 'react'

const DeleteTimerSettings = () => {
    const [selectedRadio, setSelectedRadio] = useState(null);

    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Delete Message Timer</h2>
      <div className="space-y-4">

        <div className="flex items-center">
          <input
            type="radio"
            id="option1"
            name="settingsRadio"
            value="option1"
            checked={selectedRadio === "option1"}
            onChange={handleRadioChange}
          />
          <label htmlFor="option1" className="ml-2">Never</label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="option1"
            name="settingsRadio"
            value="option1"
            checked={selectedRadio === "option1"}
            onChange={handleRadioChange}
          />
          <label htmlFor="option1" className="ml-2">30 Seconds</label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="option2"
            name="settingsRadio"
            value="option2"
            checked={selectedRadio === "option2"}
            onChange={handleRadioChange}
          />
          <label htmlFor="option2" className="ml-2">1 Minute</label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="option1"
            name="settingsRadio"
            value="option1"
            checked={selectedRadio === "option1"}
            onChange={handleRadioChange}
          />
          <label htmlFor="option1" className="ml-2">5 Minutes</label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="option1"
            name="settingsRadio"
            value="option1"
            checked={selectedRadio === "option1"}
            onChange={handleRadioChange}
          />
          <label htmlFor="option1" className="ml-2">30 Minutes</label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="option1"
            name="settingsRadio"
            value="option1"
            checked={selectedRadio === "option1"}
            onChange={handleRadioChange}
          />
          <label htmlFor="option1" className="ml-2">1 Hour</label>
        </div>

      </div>
    </div>
  )
}

export default DeleteTimerSettings