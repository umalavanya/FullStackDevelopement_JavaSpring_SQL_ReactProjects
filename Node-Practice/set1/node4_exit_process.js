const requiredVal = process.env.MY_VARIABLE ;
if(!requiredVal){
    console.log('Error: MY_VARIABLE environment variable is missing') ;
    process.exit(1); //1 indicates failure, 0 for success, 2 for Misuse of shell builtins
}

// Continue with your program
console.log('MY_VARIABLE: ', requiredVal) ;