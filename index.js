var bodyParser = require('body-parser');
const { response } = require('express');
//app.use(bodyParser.urlencoded({ extended: false }))

const express = require('express');
const { fstat } = require('fs');
const app = express();
const path = require('path');
//import books module
const Book = require('./books'); //ex. book.save()
const book = new Book();
    
var fs = require('fs');

const port = 8088
app.listen(port)


app.use('static', express.static(__dirname + '/public'))

app.use(express.urlencoded({extended:false}))

app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ extended: true }))
//Seetting handlebars
//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');

app.get('/', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})
app.get('/css', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.sendFile('/style.css', options, function(err){
        console.log(err)
    })
})
app.get('/javascript', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.sendFile('/new_test.js', options, function(err){
        console.log(err)
    })
})

//Display favs page
app.get('/favoritesAll', (req, res)=>{
    console.log('Favorites Page')
    book.init();
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.sendFile('/favorites.html', options, function(err){
        console.log(err)
    })
})


//Adding a favorite book
app.post('/favorites', (req, res)=>{

    //console.log(req.body);

    //const book = new Book(req.body.titleweb, req.body.authorweb, req.body.workid);
    book.setTitle(req.body.titleweb);
    book.setAuthor(req.body.authorweb);
    book.setID(req.body.workid);
    book.save();
    console.log(book.printAll());
    
    //let allbooks = book.printAll();
    //console.log(allbooks[0].title);
    
   
})

//Deleting a favorite book
app.post('/favorites/del', (request, response) =>{
    
    book.deleteFav(request.body.delid);
    console.log('DELETEd BOOKS');
    console.log(book.printAll());
})
//Return fav books
app.get('/favoritesAll/api', (req, res)=>{
    console.log('These are all the books');
    console.log(book.printAll());
    let returnItem = book.printAll();
    res.send(returnItem);
})
//Open edit page
app.get('/favoritesAll/edit', (req, res)=>{
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.sendFile('/favoritesedit.html', options, function(err){
        console.log(err)
    })
})
//Save the id of the book we want to edit
app.post('/favoritesAll/edit/id', (req, res)=>{
    book.editBookWithId(req.body.edit);
    console.log('Iwant to edit this books: '+book.geteditID());
})
//Get change info from form
app.post('/favoritesAll/edit/form', (req,res)=>{
    console.log("Im changing the book rn!!");
    console.log("Auto thelw na allaksw"+book.geteditID());
   
    book.updateBook(req.body.title, req.body.author);

    res.write('Changes were successful! Go back to http://localhost:8088/favoritesAll/ to view them.');
    res.end();
})
//Display review page
app.get('/favoritesAll/review', (req, res)=>{
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.sendFile('/favoritesreview.html', options, function(err){
        console.log(err)
    })
})
//Get the id of the book to be reviewed
app.post('/favoritesAll/review/id', (req, res)=>{
    book.reviewBookWithId(req.body.review);
    console.log('Iwant to review this books: '+book.getreviewId());
})
//Get the review the user has made
app.post('/favoritesAll/review/form', (req,res)=>{
    console.log(req.body.review);

    book.addReview(req.body.review);

    console.log(book.printAll());
    res.write('Your review was submited successfully! Go back to http://localhost:8088/favoritesAll/ to view it.');
    res.end();
})