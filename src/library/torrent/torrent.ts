import fs from "fs";
import WebTorrent from "webtorrent";
import { compressFolder } from "../archiver/archiver";

export const downloadTorrent = async (
  torrentLink: string,
  downloadPath: string
): Promise<string[]> => {
  return new Promise(async (resolve, _reject) => {
    const client = new WebTorrent();
    var currentProgress = "0";

    client.add(torrentLink, { path: downloadPath }, (torrent) => {
      console.log(`Downloading: ${torrent.name}`);

      torrent.on("download", (bytesDownloaded) => {
        const progress = ((bytesDownloaded / torrent.length) * 100).toFixed(2); // Progress in percentage
        if (progress !== currentProgress) {
          currentProgress = progress;
          process.stdout.write(`\rDownload progress: ${progress}%`);
        }
      });

      torrent.on("done", () => {
        console.log("Torrent download complete.");

        const downloadedFiles = torrent.files.map(
          (file) => `${torrent.path}/${file.name}`
        );

        console.log(downloadedFiles);
        compressFolder(downloadPath, `${downloadPath}.zip`);
      });
      resolve([]);
    });
  });
};
