const fs = require('fs') ;

// write hello to text16.txt synchronously
fs.writeFileSync('text16.txt','hello', 'utf8') ; // specify encoding

// Key Points
// writeFileSync() blocks the event loop until the file is written

// Creates the file if it doesn't exist

// Overwrites existing content by default (use flag: 'a' to append)

// Throws an exception on error (use try-catch to handle)

// Returns undefined on success