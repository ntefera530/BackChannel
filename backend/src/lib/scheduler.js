import { messageDeletionQueue } from "../queues/messageDeletionQueue.js";

export async function startScheduler() {
    try{
      await messageDeletionQueue.add(
      "delete-expired-messages",
      {},
      {
        repeat: { every: 30000 }, // every 30 seconds
        removeOnComplete: true,
      }
    );

    console.log("Scheduler started");
  } catch (error) {
    console.error("Error starting scheduler, Upstash might have hit limit:", error);
  }

}
