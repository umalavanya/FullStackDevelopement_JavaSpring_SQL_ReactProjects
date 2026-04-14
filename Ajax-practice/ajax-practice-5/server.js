const express = require("express") ;
const cors = require("cors") ;

const app = express() ;

app.use(express.json()) ;
app.use(cors()) ;


app.get("/products",(req,res) =>{
    res.json({message:"The products are here!!"})
})

const PORT = 3000 ;
app.listen(PORT, () => {
    console.log(`The server is running on port number: ${PORT}`) ;
}) ;