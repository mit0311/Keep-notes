
console.log("welcome to notes app , this is a app.js");
showNotes();

// if user add a notes then add it to a localstorage..

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }

    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title : addTitle.value,
        text : addTxt.value,
    }
    notesObj.push(myObj);                                         // if anyone click on add add note then notes will update.
    localStorage.setItem("notes", JSON.stringify(notesObj));             // localstorage update
    addTxt.value = "";   
    addTitle.value = "";                                                // after adding notes it will display again textarea blank 
    console.log(notesObj);                                               // it is not needed it's for user

    showNotes();

})

// function to display notes from localStorage..
function showNotes() {

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {

        html += `
        
        
                 <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                     <div class="card-body">
                         <h5 class="card-title">${element.title}</h5>
                         <p class="card-text">${element.text}</p>
                         <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                     </div>


                 </div>     `

    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else
    {
        notesElm.innerHTML = `nothing to show! use "add a note " section above to add notes`;
    }
}


// function for to delete a note..

function deleteNote(index){
    console.log("i am deleting",index);
    
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();

}

// function for search 

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){

    let inputVal = search.value;
    // let inputVal = search.value.toLowerCase();                //if you write in capital but it will also show you lowercasewords
    // let inputVal = search.value.toUpperCase();                          
    console.log("Input event fired",inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){

        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if(cardTxt.includes(inputVal))
        {
           element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
        // console.log(cardTxt);

    })
})

/*
1. add a title
2. mark a note as important
3. seprate notes by user
4. sync and host web server



*/ 
