console.log('Js Loaded!')
function findBook(){
    var str_search = document.getElementById("search").value;
    //Construct url based on search
    let url = "https://reststop.randomhouse.com/resources/works?search="+str_search;
    let init = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    }

    fetch(url,init)
    .then(function(resp){
        return resp.json();
    }).then(function(obj){
        
        console.log(obj);
       
        function display(work){
            //console.log(work.titles.isbn.$);
            let output_text =''
            if(work.titles.isbn.$){
                 output_text =
                `
                <div class="author">
                    <div id="${work.workid}" class="h_container" onclick="addToFavs(this)">
                        <i id="heart" class="far fa-heart"></i>
                    </div>
                    <h2>${work.titleweb}</h2>
                    <p>${work.titleAuth ? work.titleAuth :''}<br>
                    Book ID:${work.workid ? work.workid :''}</p>
                    
                    <p>${work.rgabout ? work.rgabout : ''}</p>

                    <img class="bookimg" src="https://reststop.randomhouse.com/resources/titles/${work.titles.isbn.$}" alt="bookphoto">
                </div>
                `
            }else{
                 output_text =
                `
                <div class="author">
                    <div id="${work.workid}" class="h_container" onclick="addToFavs(this)">
                        <i id="heart" class="far fa-heart"></i>
                    </div>
                    <h2>${work.titleweb}</h2>
                    <p>${work.titleAuth ? work.titleAuth :''}<br>
                    Book ID:${work.workid ? work.workid :''}</p>
                    
                    <p>${work.rgabout ? work.rgabout : ''}</p>
                </div>
                `
            }
            return output_text
        }

        document.getElementById("results").innerHTML = `We found ${obj.work.length ? obj.work.length : '0'} results that match your search. <br><br>`
        document.getElementById("authors").innerHTML = `
        ${obj.work.map(display).join('')} `
        

        //Listen to an addToFavs event
        //document.getElementById("wut").addEventListener("click", addToFavs(this));

        

    })
    .catch(function(error){
        console.error('Something went wrong.');
        console.error(error);
    })
}

function addToFavs(btn){

    //get book's workid via element id
    console.log(btn.id);
    var favid = btn.id;

    //fetch specific book
    let url5 = 'https://reststop.randomhouse.com/resources/works/'+favid;
    let init = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    }
    fetch(url5,init)
    .then(function(resp){
        return resp.json();
    }).then(function(obj){
        
        //make server post request
        options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(obj)
        }
        fetch('/favorites', options);
        })
        .catch(function(error){
            console.error('Something went wrong.');
            console.error(error);
        })


    
}

function displayAllFavBooks(){

    //Send a get request
    let init = {
        method: "GET",
        headers: {
            Accept: 'application/json',
        }
    }
    fetch('/favoritesAll/api', init)
    .then(function(resp){
        return resp.json();
    }).then(function(obj){
        console.log(obj.length);

        
        document.getElementById("authors").innerHTML = `
        ${obj.map(display).join('')} `
        

        function display(book){
            return `
            <div class="author">
            <div id="${book.id}" class="h_container" onclick="deleteFromFavs(this)">
                <i class="fa fa-trash-o" style="font-size:24px"></i>       
            </div>
            <div id="${book.id}" class="h_container" onclick="editFav(this)">
                <a href="favoritesAll/edit"><i class="fa fa-edit" style="font-size:24px"></i></a>
            </div>
            <h2>${book.title}</h2>
            <p>${book.author}<br>
            Book ID:${book.id}</p>
            
                <div id="${book.id}" class="review" onclick="reviewFav(this)">
                <a href="favoritesAll/review"><i class="fa fa-star" aria-hidden="true"></i></a>
                </div>
            
                <div id="sortreview">
                    ${book.review ? book.review : ''}
                </div>
            </div>
            `
        }
        

        
    })
        
}

function deleteFromFavs(item){
    console.log("Im told to delete a book");
    console.log(item.id);

    obj = { delid: item.id};
        //make server post request
        options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(obj)
        }
        fetch('/favorites/del', options);
        
}
//Choose the book we want to edit
function editFav(item){

    var editID = item.id;
    
    //send the id of the book we want to change
    obj = { edit: editID};
        //make server post request
        options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(obj)
        }
        fetch('/favoritesAll/edit/id', options);
}
//Send the id of the book we want to review
function reviewFav(item){
    var reviewID = item.id;

    obj = { review: reviewID};
        //make server post request
        options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(obj)
        }
        fetch('/favoritesAll/review/id', options);
}