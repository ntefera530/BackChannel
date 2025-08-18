import {useState} from 'react';
import { useChats,} from '../contexts/ChatContext';



function CreateChatPage() {
    const [name, setName] = useState();
    const { createGroupChat, loading } = useChats();


    const handleSubmit = async(e) => {
        e.preventDefault();
        //console.log("Username: ", username, ", Password: ", password);

        createGroupChat(name);

        // Reset the form fields
        setName("");

    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    return (
        <div>
            <h1>Create Group Chat</h1>
            <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-2xl font-bold text-center text-white">Username</label>
                        <input onChange={handleChangeName} type="text" placeholder="Username" value={name} className="bg-gray-800 border rounded p-2 mb-2 w-full text-white"  />
                    </div>
                    <button className="bg-purple-800 text-white" type="submit">Login</button>
            </form>
        </div>
    )
}

export default CreateChatPage;