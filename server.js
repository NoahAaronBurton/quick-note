const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

//middleware for serving public folder contents
app.use(express.static(path.join(__dirname, 'public'))); //! it serves the whole directory? or do I need to serve each .js and .css with other lines??

//middle ware for parsing db
app.use(express.json());

//notes page
app.get('/notes', (req,res)=>{
    console.log('youre in notes')
   
    // serve html,css,js for notes.html
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));


    
})

// notes db get req
app.get('/api/notes', (req,res) => {
    console.log('youre in notes/api GET');
    // todo: make sure endpoint is an array
    const notesPath = path.join(__dirname, 'db.json');
    fs.readFile(notesPath, 'utf-8', (err, data) => {
       if (err) {
        console.log('error reading notes')
       } else {
        const notes = JSON.parse(data);
        return res.json(notes)
       }
    } )
    
})

app.listen(3000);