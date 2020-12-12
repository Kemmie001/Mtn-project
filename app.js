
var firebaseConfig = {
    apiKey: "AIzaSyC7bR9eGeL185tKJn9Zm1iIL-0xWdLvAEU",
    authDomain: "mtn-project-b8ac4.firebaseapp.com",
    projectId: "mtn-project-b8ac4",
    storageBucket: "mtn-project-b8ac4.appspot.com",
    messagingSenderId: "887379002406",
    appId: "1:887379002406:web:7629efa88ea7ee7b1392e7",
    measurementId: "G-4VJ1N7N3MV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();


const bar = document.querySelector('.fas')
const navList = document.querySelector('.show')
loadEvent();
function loadEvent(){
  bar.addEventListener('click', showNav)
}
function showNav(){
    navList.classList.toggle('nav-show')
  
  }



const addResource = document.getElementById('send')
const bookName = document.getElementById('material-name')
const bookAuthor = document.getElementById('author')
const category = document.getElementById('category')
const file = document.getElementById('file')
const name = document.getElementById('name')

// firestore.settings({timestampsInSnapshots: true})

const db = firestore.collection("resources")

addResource.addEventListener('click', function(e){
    e.preventDefault();

    let bookNameValue = bookName.value;
    let bookAuthorValue = bookAuthor.value;
    let categoryValue = category.value;
    let fileValue = file.value;
    let nameValue = name.value;

    db.doc().set({
        BookName: bookNameValue,
        BookAuthor: bookAuthorValue,
        Category: categoryValue,
        File: fileValue,
        Name: nameValue
    }).then(function(){
        // show alert
        document.querySelector(".alert").style.display = "block";
        // hide after 3 seconds
        setTimeout(function(){
            document.querySelector(".alert").style.display = "none";
        }, 3000)
    })
    .catch(function(error){
        console.log(error);
    });
})

firestore.collection('resources').get().then((snapshot) =>
{
  snapshot.docs.forEach(doc =>
    {
      gotData(doc);
    })
})

const searchBar = document.getElementById('searchbar')

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
   const filteredDetail = resourceDetails.filter( function(e)
        {return booktitle.includes(searchString) || bookauthor.includes(searchString)  || categoryname.includes(searchString) || nameperson.includes(searchString)}
   )
    console.log(filteredDetail)
})
function gotData (doc){
    addResource.setAttribute('data-id', doc.id)
   
        booktitle = doc.data().BookName,
        bookauthor = doc.data().BookAuthor,
        categoryname = doc.data().Category,
        filename = doc.data().File,
        nameperson = doc.data().Name
      
    
    let postData = document.querySelector('.flex-container');
    postData.innerHTML += `<div class="flex">
    <span>
    <h4 style="color: #1512BB;">Name
        </h4>
        <p>${booktitle}</p>
</span><br>
<span>
    <h4 style="color: #1512BB;"> Subject
        </h4>
        <p>${categoryname}</p>
</span><br>
<span>
<h4 style="color: #1512BB;">Author</h4>
<p>${bookauthor}</p>
</span><br>
<span>
    <h4 style="color: #1512BB;">Added by</h4>
        <p>${nameperson}</p>
</span></div>
    `
}

