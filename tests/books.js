function findAuthor(){
    var str_search = document.getElementById("search").value;
    //Check input string
    search_filters = str_search.split(" ");
    size = search_filters.length;

    //Construct url
    if(size==1){
        console.log(search_filters[0]);
        
        let url = "https://reststop.randomhouse.com/resources/authors?";
        new_url = url+"lastName="+search_filters[0];
        new_url2 = url+"firstName="+search_filters[0];
        searching(new_url, new_url2);
    }
    if(size == 2){
        let url = "https://reststop.randomhouse.com/resources/authors?";
        new_url = url+"firstName="+search_filters[0]+"&lastName="+search_filters[1];
        searchingf(new_url);
    }

    function searchingf(url){
        
        let init = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }
        fetch(url,init)
        .then(function(resp){
            return resp.json();
        })
        .then(function(obj){
            function summary(spotlight){
                return `
                <p class="authorinfo">${spotlight}
                </p>
                `
            }

            function displayAuthor(author){
                return `
                <div class="author">
                    <h2>${author.authordisplay}</h2>
                    <p class="authorinfo"><strong>Author ID:</strong> ${author.authorid}</p>
                    ${author.spotlight ? summary(author.spotlight) : ''}
                    <p class="authorinfo"> ${(author.works != null) ? '<strong>Works:</strong> '+author.works.works.length : ''}</p>
                </div>
                `
            }

            document.getElementById("results").innerHTML = `We found ${obj.author.length ? obj.author.length : '0'} results that match your search. <br><br>`
            document.getElementById("authors").innerHTML = `
            ${obj.author.map(displayAuthor).join('')}`

        })
        .catch(function(error){
            console.error('Something went wrong.');
            console.error(error);
        })
    }

    function searching(url, url2){
        let init = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }
        Promise.all([
            fetch(url,init),
            fetch(url2,init)
        ])
        .then(values => {
            return Promise.all(values.map(r => r.json()));
        }).then(([one, two]) => {
            if((one.author !=null)&&(two.author!=null)){
                document.getElementById("results").innerHTML = `We found ${(one.author.length||two.author.length) ? one.author.length+two.author.length : '0'} results that match your search. <br><br>`
                document.getElementById("authors").innerHTML = `
                ${one.author.map(displayAuthor).join('')} ${two.author.map(displayAuthor).join('')}`
            }
            if((one.author !=null)&&(two.author==null)){
                document.getElementById("results").innerHTML = `We found ${one.author.length ? one.author.length : '0'} results that match your search. <br><br>`
                document.getElementById("authors").innerHTML = `
                ${one.author.map(displayAuthor).join('')}`
            }
            if((one.author ==null)&&(two.author!=null)){
                document.getElementById("results").innerHTML = `We found ${two.author.length ? two.author.length : '0'} results that match your search. <br><br>`
                document.getElementById("authors").innerHTML = `
                ${two.author.map(displayAuthor).join('')}`
            }
            if((one.author ==null)&&(two.author==null)){
                document.getElementById("results").innerHTML = `We didn't find any results that match your search. <br><br>`
            }  
            function summary(spotlight){
                return `
                <p class="authorinfo">${spotlight}
                </p>
                `
            }
            function displayAuthor(author){
                return `
                <div class="author">
                    <h2>${author.authordisplay}</h2>
                    <p class="authorinfo"><strong>Author ID:</strong> ${author.authorid}</p>
                    ${author.spotlight ? summary(author.spotlight) : ''}
                    <p class="authorinfo"> ${(author.works != null) ? '<strong>Works:</strong> '+author.works.works.length : ''}</p>
                </div>
                `
            }
        });   
    }

  
}