import * as fs from "fs";
import * as path from "path";
import archiver from "archiver";

/**
 * Compresses a folder into a .zip file.
 * @param folderPath - The path of the folder to compress.
 * @param outputPath - The output path for the .zip file.
 */
export const compressFolder = (
  folderPath: string,
  outputPath: string
): void => {
  // Check if the folder exists
  if (!fs.existsSync(folderPath)) {
    console.error(`Folder not found: ${folderPath}`);
    return;
  }

  // Create a write stream for the output .zip file
  const output = fs.createWriteStream(outputPath);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Maximum compression level
  });

  // Listen for completion
  output.on("close", () => {
    console.log(`Archive created successfully: ${outputPath}`);
    console.log(`Total size: ${archive.pointer()} bytes`);
    fs.rmdirSync(folderPath);
  });

  // Handle errors
  archive.on("error", (err: Error) => {
    console.error(`Error creating archive: ${err.message}`);
    throw err;
  });

  // Pipe the archive data to the file
  archive.pipe(output);

  // Add the folder to the archive
  archive.directory(folderPath, path.basename(folderPath)); // Maintain the folder name in the archive

  // Finalize the archive (complete the compression process)
  archive.finalize();
};
