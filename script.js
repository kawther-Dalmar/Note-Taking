let noteAria = document.querySelector(".note-aria") 
let noteText = document.querySelector(".note-text") 
let title = document.querySelector(".title")
let note = document.querySelector(".note") ;
let notes = document.querySelector("#notes");

const shoowNoteText =()=>{
    noteText.style = 'display:block';
    noteAria.classList.add("note-now")
    title.setAttribute('placeholder','Title');
    title.style = 'font-size: 20px';
}
const hideNoteTex =()=>{
    noteText.style = 'display:none';
    noteAria.classList.remove("note-now");

}

const addNoteToLocalStorage = (note)=>{
    if(note.length < 0){
        return;
    }
    console.log(note)
    let oldNote;
    if(localStorage.getItem("notes")===null){
        oldNote =[]
    } else{
       oldNote= JSON.parse( localStorage.getItem('notes'))
    }
    oldNote.push(note);
    localStorage.setItem('notes', JSON.stringify(oldNote))

}


const getNotesFromLocalStorage =()=>{

    let oldNote;
    if(localStorage.getItem("notes")===null){
        oldNote =[]
    } else{
       oldNote= JSON.parse( localStorage.getItem('notes'))
    }


    oldNote.forEach(note => {
        notes.innerHTML += 
        ` <div class="note">
       <h3 class="title-text" id="title-text">${note[0]}</h3>
       <p class="note-blog">${note[1]} </p>
       <i class="  fa fa-trash " ></i>
      </div>`
        
    });

}

const deleteFromLocalStorage = (deletedNote)=>{


    let oldNote;
    if(localStorage.getItem("notes")===null){
        oldNote =[]
    } else{
       oldNote= JSON.parse( localStorage.getItem('notes'))
    }

    oldNote.map((note,index)=>{

       // console.log(deletedNote.children)

       if(note[0] == deletedNote.children[0].textContent.trim()  &&  note[1] == 
       deletedNote.children[1].textContent.trim()){
        //console.log("YES")

        oldNote.splice(index,1);
        return oldNote;
       }

    });

    localStorage.setItem('notes',JSON.stringify(oldNote));



}



document.addEventListener("DOMContentLoaded",getNotesFromLocalStorage);

 const addNote = (t,n)  =>{
  notes.innerHTML += 
  ` <div class="note">
 <h3 class="title-text" id="title-text">${t}</h3>
 <p class="note-blog">${n} </p>
 <i class="  fa fa-trash " ></i>
</div>`

title.value ='';
noteText.value='';

}



noteAria.addEventListener("click",shoowNoteText)
   
document.addEventListener("click",(event)=>{

    let isclicked= noteAria.contains(event.target)

    if(!isclicked){
        hideNoteTex();
        if(title.value.length ===0 && noteText.value.length===0){
            return;
        } else{
            addNoteToLocalStorage([title.value,noteText.value]);
            addNote(title.value,noteText.value)
           
        }
        
    }
});

document.addEventListener("mouseover",(event)=>{
    if(event.target.classList.contains("note"))
    event.target.querySelector("i").classList.add("show");
})
document.addEventListener("mouseout",(event)=>{
    if(event.target.classList.contains("note"))
    event.target.querySelector("i").classList.remove("show");
})

document.addEventListener("click",(event)=>{
    if(event.target.classList.contains("fa-trash")){
        event.target.parentElement.remove();
        deleteFromLocalStorage(event.target.parentElement)
    }
})

//Local Storage
// localStorage.setItem('name','kauthar');
// console.log(localStorage.getItem('name'));

