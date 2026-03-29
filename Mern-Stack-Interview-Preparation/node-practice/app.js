const express = require('express') ;

const app = express() ;

app.get('/', (req, res) => res.send('Hello Worls!')) ;
app.listen(8080) ;