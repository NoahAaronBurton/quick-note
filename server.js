const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); //! it serves the whole directory? or do I need to serve each .js and .css with other lines??


app.get('/notes', (req,res)=>{
    console.log('youre in notes')
   
    // serve html,css,js for notes.html
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));


    
})
//todo: debug index.js


app.listen(3000);