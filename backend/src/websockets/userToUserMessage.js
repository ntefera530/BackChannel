export const sendMessageToUser = (ws, sender, recipient, data) => {
    console.log(`User ${sender} --> User "${recipient}": ${data}`);

    //If Other user is connected, send to them

    //If not then store to be sent later.
}