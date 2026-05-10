const { exec } = require('child_process');

// Use the full path to Git since it wasn't in your system PATH earlier
const GIT_PATH = '"C:\\Program Files\\Git\\cmd\\git.exe"';
const SYNC_INTERVAL = 15000; // Checks for changes every 15 seconds

console.log(`Starting auto-sync. Checking for changes every ${SYNC_INTERVAL / 1000} seconds...`);
console.log('Keep this terminal open. Press Ctrl+C to stop.\n');

setInterval(() => {
  // Check if there are any changes
  exec(`${GIT_PATH} status --porcelain`, (err, stdout) => {
    if (err) {
      console.error('Error checking git status:', err.message);
      return;
    }

    // If output is not empty, there are uncommitted changes
    if (stdout.trim().length > 0) {
      console.log(`[${new Date().toLocaleTimeString()}] Changes detected. Syncing to GitHub...`);
      
      const syncCommand = `${GIT_PATH} add . && ${GIT_PATH} commit -m "Auto-sync: update files" && ${GIT_PATH} push`;
      
      exec(syncCommand, (syncErr, syncOut, syncStderr) => {
        if (syncErr) {
          console.error(`[${new Date().toLocaleTimeString()}] Error syncing:`, syncStderr || syncErr.message);
        } else {
          console.log(`[${new Date().toLocaleTimeString()}] Successfully synced to GitHub!`);
        }
      });
    }
  });
}, SYNC_INTERVAL);
