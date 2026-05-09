const express = require('express') ;

const app = express() ;

app.use(express.json()) ;


app.get('/',(req,res) =>{
    res.send('Hello World!')

})

app.get('/uma',(req,res) => {
res.send('Uma!!') ;
}) ;


app.post('/users', (req,res) => {
    const {name, email} = req.body ;
    res.json({
        message: 'User Created Successfully!',
        user:{name, email}
    });
}) ;


app.post('/login', (req,res) => {
    const {username, password} = req.body ;

    if(username === 'admin' && password === '123'){
        res.json({success: true, message: 'Login successful!'}) ;
    } else {
        res.status(401).json({success: false, message: 'Invalid credentials'}) ;
    }
}) ;





const PORT = 3000 ;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`) ;
}) ;