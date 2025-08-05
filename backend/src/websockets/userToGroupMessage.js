export const sendMessageToGroup = (ws, sender, recipient, data) => {
    console.log(`User ${sender} --> Group "${recipient}": ${data}`);
    //write to a data base
    // ID | SENDER | RECIPIENT | MESSAGE (200) 
}