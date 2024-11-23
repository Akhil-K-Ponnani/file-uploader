import * as fs from "fs";
import { Storage } from "megajs";

// MEGA account credentials
const email = process.env.MEGA_EMAIL as string;
const password = process.env.MEGA_PASSWORD as string;

// File to upload
const filePath = "./path/to/your/file.txt";

// Function to upload a file
async function uploadToMega() {
  try {
    // Log in to MEGA
    const storage = new Storage({ email, password });
    console.log("Logging into MEGA...");

    // Wait for storage to be ready
    await new Promise<void>((resolve, reject) => {
      // @ts-ignore
      storage.on("ready", resolve);
      // @ts-ignore
      storage.on("error", reject);
    });

    console.log("Successfully logged in.");

    // Create a read stream for the file
    const readStream = fs.createReadStream(filePath);

    // Upload the file
    const file = storage.upload(filePath.split("/").pop()!); // Upload with the file's original name
    readStream.pipe(file);

    console.log("Uploading file...");

    // Wait for the upload to complete
    await new Promise<void>((resolve, reject) => {
      file.on("complete", () => {
        console.log("File uploaded successfully.");
        resolve();
      });
      file.on("error", reject);
    });

    // Print the file's download link
    // @ts-ignore
    console.log(`Download link: ${file.link}`);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

// Start the upload process
uploadToMega();
