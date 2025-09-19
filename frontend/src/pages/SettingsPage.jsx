import { useUser } from "../contexts/UserContext";
function SettingsPage(){
    const {username} = useUser();
    return(
        <div>
            <h1>Settings Page</h1>
            <h1>logged in as {username} </h1>
        </div>
    )
}

 export default SettingsPage;