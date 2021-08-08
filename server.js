
const express = require('express');
const note = require('./db/db.json'); 
const axe = require('path');
const fs = require('fs');
const another = express();
const PORT = process.env.PORT || 2000;


another.use(express.urlencoded({ extended: true }));

another.use(express.json());

another.get('/notes', (req, res) => {
    res.sendFile(axe.join(__dirname, './public/notes.html'));
});



another.get('/api/notes', (req, res) => {res.json(note.slice(1));
});

another.use(express.static('public'));
another.get('*', (req, res) => {res.sendFile(axe.join(__dirname, './public/index.html'));
});

another.get('/', (req, res) => { res.sendFile(axe.join(__dirname, './public/index.html'));
});




function creacion(body, notas) {
    const nuevas = body;
    
    if (!Array.isArray(notas))
        notas = [];
    
    if (notas.length === 0)
        notas.push(0);

    body.id = notas[0];
    notas[0]++;

    notas.push(nuevas);
    
    
    fs.writeFileSync(
        axe.join(__dirname, './db/db.json'),
        JSON.stringify(notas, null, 2)
    );
    return nuevas;
}

another.post('/api/notes', (req, res) => {
    const nuevas = creacion(req.body, note);
    res.json(nuevas);
});

function eraser(id, notas) 
    
    {for 
        (let i = 0; i < notas.length; i++) {
        let note = notas[i];

        if (note.id == id) 
        {   notas.splice(i, 1);
            fs.writeFileSync(
                axe.join(__dirname, './db/db.json'),
                JSON.stringify(notas, null, 2)
            );

            break;
        }
    }
}

another.delete('/api/notes/:id', (req, res) => {
    eraser(req.params.id, note);
    res.json(true);
});

another.listen(PORT, () => {
    console.log(`Your page is ready on localhost:${PORT}!`);
});
