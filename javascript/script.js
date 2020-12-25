//variable
let myvar;
//UI Define
let title = document.querySelector('#addtitle');
let author = document.querySelector('#addauthor');
let price = document.querySelector('#addprice');
let sub = document.querySelector('#submit');
let tbody = document.querySelector('#body');
let form = document.querySelector('#book-form');
let search = document.querySelector('#search');

//eventListener

form.addEventListener('submit', addbook);
tbody.addEventListener('click', remove);
search.addEventListener('keyup', filtered);


// class
class Book {
    constructor(btitle, bauthor, bprice) {
        this.btitle = btitle;
        this.bauthor = bauthor;
        this.bprice = bprice;
    }

}

class Ui {
    constructor() {

    }
    static addTobooklist(book) {
        let row = document.createElement('tr');

        let newtitle = document.createElement('td');
        let rem = document.createElement('a');
        rem.setAttribute('href', '#');
        rem.style.textDecoration = 'none';

        rem.appendChild(document.createTextNode('remove'));
        newtitle.appendChild(document.createTextNode(book.btitle));
        row.appendChild(newtitle);

        let newauthor = document.createElement('td');
        newauthor.appendChild(document.createTextNode(book.bauthor));
        row.appendChild(newauthor);

        let newprice = document.createElement('td');
        newprice.appendChild(document.createTextNode(book.bprice));
        row.appendChild(newprice);

        let del = document.createElement('td');
        del.appendChild(rem);
        row.appendChild(del);

        tbody.appendChild(row);
        // storeTaskInLocalStorage(title.value,author.value,price.value);

    }

    blank() {
        title.value = '';
        author.value = '';
        price.value = '';
    }

    showalert(message, classname) {
        removealert();
        let div = document.createElement('div');
        div.className = `alert ${classname} text-white`;
        let container = document.querySelector('.container');
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, form);

        myvar = setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);

    }

    static added(message, classname) {
        removealert();
        let div = document.createElement('div');
        div.className = `alert ${classname} text-white`;
        let container = document.querySelector('.container');
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, form);

        myvar = setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

class Store {
    static getbooks(book) {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static printbook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        books.forEach(book => {
            Ui.addTobooklist(book);
        });
    }

    static removeFromLS(price) {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }


        books.forEach((book, index) => {
            if (book.bprice === price) {
                books.splice(index, 1);
            }
        });



        localStorage.setItem('books', JSON.stringify(books));
    }
}



//function


function addbook(e) {

    let ui = new Ui();
    if (title.value === '' || author.value === '' || price.value === '') {

        ui.showalert('Fill up all fields', 'error');
        //alert('Some Fields Are Empty');
    }
    else {
        let book = new Book(title.value, author.value, price.value)


        Ui.addTobooklist(book);
        ui.blank();

        Ui.added('Added Successfully', 'success');
        Store.getbooks(book);



    }

    e.preventDefault();
}

function remove(e) {
    let book = new Book(title.value, author.value, price.value)
    if (e.target.hasAttribute('href')) {
        let ele = e.target.parentElement;
        let ele1 = ele.parentElement;

        ele1.remove();
        Ui.added('Removed Successfully', 'success');
        Store.removeFromLS(e.target.parentElement.previousElementSibling.textContent.trim());
        console.log(e.target.parentElement.previousElementSibling.textContent.trim());
    }
}
function filtered(e) {
    let text = search.value.toLowerCase();
    let table = document.querySelector('#mytable');
    let tests = table.getElementsByTagName('tr');
    tests = Array.from(tests);
    tests.forEach((item,index) => {
        let data = tests[index].getElementsByTagName('td')[0];
        if (data) {
            let textvalue = data.textContent;
            if (textvalue.toLowerCase().trim().indexOf(text) != -1) {
                tests[index].style.display = '';
            } else {
                tests[index].style.display = 'none';
            }
        }
    });


}

// function matched(i){

//         // let test = document.querySelectorAll('li');
//         let data = 
//         let item = i.firstChild.textContent;
//         if(item.toLowerCase().indexOf(text)!=-1){
//             i.style.display = 'block';
//         }
//         else{
//             i.style.display = 'none';
//         }
//     }

//reload eventlistener

function removealert(){
    let currentdiv = document.querySelector('.alert');
    if(currentdiv){
        currentdiv.remove();
    }
    clearTimeout(myvar);
}
document.addEventListener('DOMContentLoaded', Store.printbook());

