import chalk from 'chalk';
import fs from 'fs';
const path = 'build/browser/script.js';

fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
    console.log(chalk.redBright('|ERR|'), ' An error occurred:', err);
    return;
  }

  // Split the file into lines
  const lines = data.split('\n');

  // Remove the last two lines
  const newLines = lines.slice(0, -2);

  // Adds a new line
  newLines.push('\n');

  // Join the remaining lines back together
  const newData = newLines.join('\n');

  // Write the modified content back to the file
  fs.writeFile(path, newData, 'utf8', err => {
    if (err) {
      console.error(chalk.redBright('|ERR|'), 'An error occurred while writing the file:', err);
      return;
    }

    console.log(chalk.greenBright('|SCS|'), 'Successfully built.');
  });
});

