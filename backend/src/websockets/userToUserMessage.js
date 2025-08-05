import WebSocket from "ws";
export const sendMessageToUser = (ws, sender, recipient, data, clientsMap) => {
    //console.log(`User ${sender} --> User "${recipient}": ${data}`);
   
    // Need to parse string id to userID, fix this??
    const client = clientsMap.get(parseInt(recipient));
    console.log(clientsMap);

    if(client && client.readyState === WebSocket.OPEN){
        client.send(data);
    }
    else{
        console.log(`${recipient} is not connected`);
    }
    //If Other user is connected, send to them

    //If not then store to be sent later.
}