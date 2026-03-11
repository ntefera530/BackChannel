import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';

const options = [
    { label: "Never", value: null },
    { label: "30 seconds", value: 30 },
    { label: "1 minute", value: 60 },
    { label: "5 minutes", value: 300 },
    { label: "30 minutes", value: 1800 },
    { label: "1 hour", value: 3600 },
];

const DeleteTimerSettings = () => {
    const { deleteTimerSeconds, updateUserSettings } = useUser();
    const [selectedValue, setSelectedValue] = useState(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setSelectedValue(deleteTimerSeconds);
    }, [deleteTimerSeconds]);

    const handleChange = (value) => {
        const parsed = value === "null" ? null : Number(value);
        setSelectedValue(parsed);
        setSaved(false);
    };

    const handleSave = () => {
        updateUserSettings(selectedValue);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="px-6 py-6 border-b border-base-300">
            <p className="text-xs font-medium uppercase tracking-widest text-base-content/50 mb-4">
                Message Timer
            </p>
            <p className="text-sm text-base-content/60 mb-4">
                Automatically delete messages after they are sent.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-5">
                {options.map((option) => (
                    <label
                        key={String(option.value)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all
                            ${selectedValue === option.value
                                ? 'border-primary bg-primary/8 text-primary'
                                : 'border-base-300 hover:border-base-content/20 text-base-content/70'
                            }`}
                    >
                        <input
                            type="radio"
                            name="deleteTimer"
                            value={option.value === null ? "null" : option.value}
                            checked={selectedValue === option.value}
                            onChange={(e) => handleChange(e.target.value)}
                            className="hidden"
                        />
                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${selectedValue === option.value ? 'border-primary' : 'border-base-content/30'}`}>
                            {selectedValue === option.value && (
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </div>
                        <span className="text-sm">{option.label}</span>
                    </label>
                ))}
            </div>

            <button
                onClick={handleSave}
                className={`btn btn-sm ${saved ? 'btn-success' : 'btn-primary'} transition-all`}
            >
                {saved ? 'Saved!' : 'Save'}
            </button>
        </div>
    );
};

export default DeleteTimerSettings;