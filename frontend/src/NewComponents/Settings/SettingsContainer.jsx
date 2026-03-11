import { useUser } from '../../contexts/UserContext';
import { LogOut } from 'lucide-react';
import SettingsHeader from "./SettingsHeader";
import DeleteTimerSettings from "./DeleteTimerSettings";
import ProfilePictureSettings from "./ProfilePictureSettings";
import DeleteMessagesSetting from "./DeleteMessagesSetting";

const SettingsContainer = () => {
    const { handleLogout } = useUser();

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
            <SettingsHeader />

            <div className="flex-1 overflow-y-auto">
                <ProfilePictureSettings />
                <DeleteTimerSettings />
                <DeleteMessagesSetting />
            </div>

            {/* Logout footer */}
            <div className="border-t border-base-300 px-6 py-4">
                <button
                    onClick={handleLogout}
                    className="btn btn-ghost btn-sm text-error gap-2 w-full"
                >
                    <LogOut className="w-4 h-4" />
                    Log out
                </button>
            </div>
        </div>
    );
};

export default SettingsContainer;