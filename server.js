const express = require('express');
const app = express();
const fs = require('fs');
const { writeFile } = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;


//middleware for serving public folder contents
app.use(express.static(path.join(__dirname, 'public'))); 

//middle ware for parsing db
app.use(express.json());

app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//notes page
app.get('/notes', (req,res)=>{
    console.log('youre in notes')
   
    // serve html,css,js for notes.html
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));


    
})

// notes db get req
app.get('/api/notes', (req,res) => {
    console.log('youre in notes/api GET');
    
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

// POST req for new notes
app.post('/api/notes', (req,res) => {
    //? handle incoming post request
    console.info(`post?: ${req.method}`)
    

    const {title, text} = req.body;

    const newNote =  {
        id: uuidv4(),
        title,
        text,
    }

    const noteString = JSON.stringify(newNote);
    console.log(noteString);

    const dbFilePath = './db.json';
    fs.readFile(dbFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('error reading db');
            res.status(500)
            return;
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            writeFile('./db.json', JSON.stringify(parsedData, null, 4), (writeErr) => {
                if (writeErr) {
                    console.error('error writng to db')
                    res.status(500)
                    return;
                } 


            })
        }
    })

    //send back res
    res.json({ message: 'note created successfully'})
})

// GET req for note content
app.get('/notes/:noteId', (req,res) => {
    const noteId = req.params.noteId;

    // send back res
    res.json({noteId, note: retrievedNote});
})



app.listen(PORT, () => {
    console.log(`listing at http://localhost:/${PORT}`);
});
