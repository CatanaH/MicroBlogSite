const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(methodOverride('_method'))

let comments = [
    {
        id:uuidv4(),
        username: "Todd",
        comment: "lol, so funny"
    },
    {
        id:uuidv4(),
        username: "Skylar",
        comment: "Not funny!>_<"
    },
    {
        id:uuidv4(),
        username: "MamaBear",
        comment: "Not my Baby!"
    },
    {
        id:uuidv4(),
        username: "Weldon",
        comment: "Art is art is art is art, man"
    }
]

app.get('/',(req,res) => {
    res.render('home', {comments})
})

app.get('/detail/:id', (req,res) => {
    const {id} = req.params;
    const com = comments.find(c => c.id === id);
    res.render('detail', {com});
})

app.get('/:id/edit', (req,res) => {
    const {id} = req.params;
    const com = comments.find(c => c.id === id);
    res.render('edit', {com});
})

app.get('/new', (req,res) => {
    res.render('new')
})

app.post('/create', (req, res) => {
    const id = uuidv4();
    const {username, comment} = req.body;
    comments.push({username, comment, id})
    res.redirect('/');
    
})
app.patch('/:id', (req,res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/');
})

app.delete('/:id', (req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/');
})




app.listen(3000, () => {
    console.log("listening on port 3000")
})