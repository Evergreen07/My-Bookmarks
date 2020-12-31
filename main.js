var name_ = document.querySelector('#name');
var url_ = document.querySelector('#url');
var add_ = document.querySelector('#form');
var msg_ = document.querySelector('.msg');
var find_ = document.querySelector('#type');

add_.addEventListener('submit',AddBookmark);
find_.addEventListener('keyup',filteritems);

function AddBookmark(e) { 
    e.preventDefault();
    
    if(name_.value=='' || url_.value=='') {
        msg_.innerHTML = '*Please enter all fields';
        setTimeout(() =>  msg_.innerHTML = '',1000);
    }
    else{
        console.log('Bookmark Added !!!');
        msg_.innerHTML = 'Bookmark Added !!!';
        setTimeout(() => msg_.innerHTML = '',1000);

        var bookmarks = {
            name : name_.value,
            url :  url_.value
        }

        //console.log(bookmarks);

        // Local Storage (Testing)
        // localStorage.setItem('My Bookmarks',"Heyyy");
        // console.log(localStorage.getItem('My Bookmarks'));
        // localStorage.removeItem('My Bookmarks');
        // console.log(localStorage.getItem('My Bookmarks'));

        if(localStorage.getItem('My Bookmarks') === null){
            var book = [];
            book.push(bookmarks);
            localStorage.setItem('My Bookmarks',JSON.stringify(book));
        }
        else{
            var book = JSON.parse(localStorage.getItem('My Bookmarks'));
            book.push(bookmarks);
            localStorage.setItem('My Bookmarks',JSON.stringify(book));
        }
        
        setTimeout(() => name_.value = '',1000);
        setTimeout(() => url_.value = '',1000);

        GetBookmark();
    }
}

function GetBookmark() {
    //console.log(localStorage.getItem('My Bookmarks'));
    
    var book = JSON.parse(localStorage.getItem('My Bookmarks'));
    var display = document.querySelector('.display');

    display.innerHTML = ''; // Clear all & insert from Beginning

    for(var i = 0 ; i<book.length ; i++)
    {
        var bk = book[i].name;
        var ur = book[i].url;

        display.innerHTML += '<div class="card">'+'<a href="'+ur+
        '" target="blank">'+bk+'</a>'+'<i onclick="DeleteBookmark(\''+ur+'\')" class="fas fa-window-close fa-lg"></i>'+'</div>';
        // display.innerHTML += `
        // <div class="card">
        //     <a href="${ur}"  target="blank">${bk}</a>
        // </div>
        // `
    }
}

function DeleteBookmark(e) {
    console.log(e);
    var book = JSON.parse(localStorage.getItem('My Bookmarks'));
    
    for(var i = 0 ; i<book.length ; i++){
        //console.log(i);
        if(book[i].url === e)
         {
            console.log(book[i].name); 
            book.splice(i,1);
         }
    } 
    localStorage.setItem('My Bookmarks',JSON.stringify(book));
    GetBookmark();
}

function filteritems(e){
    //console.log(e);

    var text = e.target.value.toLowerCase();
    //console.log(text);

    //var display = document.querySelector('.display');

    var card = document.querySelectorAll('.card');

    //console.log(card);

    for(var i=0; i<card.length; i++){
        var check = card[i].getElementsByTagName('a')[0]; //0 to get the current link, else it will grasp the entire HTML collection every time.

        if(check.innerHTML.toLowerCase().indexOf(text) > -1){
            card[i].style.display = '';
        }
        else{
            card[i].style.display = 'none';
        }

        //console.log(check);
    }
}