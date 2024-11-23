import { compare } from "bcryptjs";
import { FileTypes } from "../utils/constants";
import { downloadTorrent } from "../library/torrent/torrent";
import { v4 as uuidv4 } from "uuid";

const files = [];

export const loginUser = async (loginData: {
  username: string;
  password: string;
}): Promise<boolean> => {
  const { username, password } = loginData;

  if (username === process.env.USER_NAME) {
    const res = await compare(password, process.env.PASSWORD as string);

    if (res) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const uploadFile = async (fileData: {
  path: string;
  type: string;
}): Promise<any> => {
  const { path, type } = fileData;
  let res;
  const downloadPath = `${process.env.FILES_DIR_PATH}/${uuidv4()}`;
  switch (type) {
    case FileTypes.Torrent:
      res = await downloadTorrent(path, downloadPath);
      break;

    default:
      break;
  }
  console.log(res);
};
