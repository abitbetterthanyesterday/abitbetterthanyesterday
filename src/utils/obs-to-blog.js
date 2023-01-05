import fs from "fs/promises";

const VAULT_PATH = "/home/abr/perso/PKM/20_areas/20.30_blog/";

// 1. Get the list of files that have draft of false
const isDirectory = async (filePath) => {
  const stats = await fs.stat(filePath);
  return stats.isDirectory();
};

const getNotesList = async () => {
  const notes = [];
  await findNotesInDirectoryRecursively(VAULT_PATH, notes);
  return notes;
};

// Note that this function is impure.
const findNotesInDirectoryRecursively = async (directory, notes) => {
  const files = await fs.readdir(directory);

  for (const file of files) {
    const filePath = `${directory}/${file}`;
    (await isDirectory(filePath))
      ? await findNotesInDirectoryRecursively(filePath, notes)
      : notes.push({ title: file, path: filePath });
  }
};

try {
  const notes = await getNotesList();
  for (const note of notes) {
    const contents = await fs.readFile(note.path, { encoding: "utf8" });
    console.log(contents);
  }
  console.log(notes);
} catch (e) {
  console.log(e);
}
// 2. Read each files

// 3. Look for wiki links
// 4. For each wiki links, check if the files exists
// 5. If the file doesn't exist, remove the wiki link (turn into text)
// 6. If the file does exist, create a link to it

export {};
