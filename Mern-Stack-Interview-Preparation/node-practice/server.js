const express = require("express") ;
const app = express() ;


app.get("/", (req,res) => {
    res.send("Welcome to Express Practice")
}) ;

app.get("/about", (req, res) => {
    res.send("About Page")
})

app.get("/contact", (req, res) => {
    res.send("Contact Page")
})

app.get("/user/:id", (req,res) => {
    const userId =  req.params.id
    res.send("User Id is" + userId)

})


app.use((req, res, next) => {

    console.log("Middleware executed")

    next()

})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
