import { messageDeletionQueue } from "../queues/messageDeletionQueue.js";


export async function startScheduler() {

  await messageDeletionQueue.add(
    "delete-expired-messages",
    {},
    {
      repeat: { every: 30000 }, // every 5 seconds
      removeOnComplete: true,
    }
  );

  console.log("Scheduler started");
}
