import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Int32 } from 'mongodb';

mongoose.connect('mongodb+srv://khyatibhosle:bookLibrary@booklibrary.sblcmxy.mongodb.net/')

const app = express();
const port = 3000;

const bookSchema = new mongoose.Schema({
    title: String,
    author: Array,
    review: String,
    description : String,
    olid: Array,
    date: Date,
    link: String,
    rating: Number,
    status: String,
    comments: Array
});

const Library = mongoose.model('Library', bookSchema);

var title = '';
var author = '';
var id='';
var olid =[];
var status = '';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    Library.find({status:"Completed"}).then((books)=>{
        Library.find({status: "Reading"}).then((reading)=>{
            res.render('index.ejs', {books: books, pending: reading});
        })
    })
})

app.get('/write', (req, res) => {
    res.render("write.ejs");
})

app.get('/data', (req, res) =>{
    res.render("data.ejs", {title: title, author: author, olid: olid, id: id, status: status})
})

app.get('/allBooks', (req,res)=>{
    Library.find({}).then((books)=>{
        res.render('allBooks.ejs', {books: books})
    })
})

app.get('/:id', (req,res)=>{
    Library.findById(req.params.id).then((book)=>{
        if(book != []){
            res.render('book.ejs', {book: book});
        }else{
            console.log('book not found');
        }
    }).catch((err)=>{
        console.log(err);
    })
});

app.post('/write', (req, res)=>{
    console.log(Number(req.body.rating));
    var date = new Date();
    var olidurl = "https://openlibrary.org/search.json?title=" + req.body.title;
    olidurl = olidurl.replace(/ /g, '+');
    fetch(olidurl).then((response)=>{
        response.json().then((data) =>{
            data.docs.forEach(doc =>{
                if(doc.title.toLowerCase() === req.body.title.toLowerCase()){
                    if(req.body.author != ""){
                        if(req.body.author.toLowerCase() === doc.author_name[0].toLowerCase()){
                            var book = new Library({
                                title: doc.title,
                                author: doc.author_name,
                                olid: doc.edition_key.slice(0, 20),
                                date: date.toString(),
                                review: "",
                                link: "",
                                description: "",
                                status: req.body.status
                            });
                            book.save();
                            status = req.body.status;
                            title = doc.title;
                            author = doc.author_name;
                            id = book.id
                            olid = doc.edition_key.slice(0, 20);
                            req.body.title = " ";
                        }
                    }else{
                        var book = new Library({
                            title: doc.title,
                            author: doc.author_name,
                            olid: doc.edition_key.slice(0, 20),
                            date: date.toString(),
                            review: "",
                            link: "",
                            description: "",
                            status: req.body.status
                        });
                        book.save();
                        console.log(book.id);
                        title = doc.title;
                        author = doc.author_name;
                        olid = doc.edition_key.slice(0, 20);
                        id = book.id
                        req.body.title = " ";
                        status = req.body.status;
                    }
                }
            })
            res.redirect("/data");
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err);
    })
})

app.post('/data', (req,res)=>{
    Library.findByIdAndUpdate(req.body.author, {review: req.body.review, description: req.body.description, link: req.body.link, rating: req.body.rating}).then(()=>{
        title = "";
        author = "";
        olid = [];
        id = "";
        res.redirect("/");
    }).catch((err)=>{
        console.log(err);
    })

})


app.listen(port, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log(`Server listening on port ${port}`);
    }
})

