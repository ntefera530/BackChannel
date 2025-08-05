export const sendMessageToGroup = (ws, sender, recipient, data) => {
    console.log(`User ${sender} --> Group "${recipient}": ${data}`);
}