let books = []
let nextId = 0
let reviewId = 0;
//let reviews =[];

class Book{
    constructor(title, author, id, review){
        this.title = title
        this.author = author
        this.id = id
        this.review = review;
    }
    setTitle(title){
        this.title = title;
    }
    getTitle(){
        return this.title;
    }
    setAuthor(author){
        this.author = author;
    }
    getAuthor(){
        return this.author;
    }
    setID(id){
        this.id = id;
    }
    getID(){
        return this.id;
    }
    setReview(rev){
        this.review = rev;
    }
    getReview(){
        return this.review;
    }
    check(){
        return {'title': this.title, 'author': this.author, 'id': this.id,};
    }
    save(){
        //if book already exists
        var i;
        for(i=0;i<books.length;i++){
            if(books[i].id==this.getID()){ 
            //add book
            return;
            }
        }
        books.push({'title': this.title, 'author': this.author, 'id': this.id, 'review': this.review});
    }
    deleteFav(idIN){
        var i;
        for(i=0;i<books.length;i++){
            console.log("I have this id"+books[i].id);
            console.log("and I need to delete this id:"+idIN);
            if(books[i].id==idIN){
                books.splice(i,1);
            }
        }    
        
    }
    printAll(){
        return books;
    }
    init(){
        let ob1 = new Book('A Brief History Of Time', 'Hawking Stephen',  97808, '');
        ob1.save();
        let ob2 = new Book('1984', 'Orwell George',  38246, '');
        ob2.save();
    }
    editBookWithId(eid){
        nextId = eid;
    }
    geteditID(){
        return nextId;
    }
    updateBook(tit, auth){
        var i;
        for(i=0;i<books.length;i++){
            if(books[i].id==this.geteditID()){
                books[i].author = auth;
                books[i].title = tit;
            }
        }
    }
    reviewBookWithId(rid){
        reviewId = rid;
    }
    getreviewId(){
        return reviewId;
    }
    addReview(text){
        
        var i;
        for(i=0;i<books.length;i++){
            if(books[i].id == reviewId){
               books[i].review = text;
            }
        }
    }
}

module.exports = Book;