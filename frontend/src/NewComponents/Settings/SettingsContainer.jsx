import SettingsHeader  from "./SettingsHeader";
import DeleteTimerSettings from "./DeleteTimerSettings";
import ProfilePictureSettings from "./ProfilePictureSettings";
import DeleteMessagesSetting from "./DeleteMessagesSetting";

const SettingsContainer = () => {
    return (
        <div className="flex flex-col h-full">  
            <SettingsHeader/>
            <ProfilePictureSettings/>
            <DeleteTimerSettings/>
            <DeleteMessagesSetting/>  
        </div>
    );
}

export default SettingsContainer;