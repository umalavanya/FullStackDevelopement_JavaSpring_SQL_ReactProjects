// Get the 3rd argument (index 2 because argv[0] is node path, argv[1] is script path)
// Check if 3rd argument exists
if (process.argv.length >= 3) {
    const thirdArgument = process.argv[2];
    console.log('3rd argument:', thirdArgument);
} else {
    console.log('No 3rd argument provided');
}


// These all work without any imports
console.log(process.argv);        // Command line arguments
console.log(process.env);         // Environment variables
console.log(process.cwd());       // Current working directory
console.log(process.version);     // Node.js version
console.log(process.pid);         // Process ID

// Exit the process
process.exit(1);

// Handle process events
process.on('exit', () => {
    console.log('Process exiting');
});