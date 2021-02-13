let addToDoBtn = document.getElementById("addToDo");
let collectionContainer = document.getElementById("collectionContainer");
let inputField = document.getElementById("inputField");

addToDoBtn.addEventListener('click', ()=>{
  const inputValue = inputField.value;
  if ( inputValue.trim() == '' ) return;


  var listItem = document.createElement('li');
  listItem.className = "collection-item";
  listItem.innerHTML = `<div>${inputValue}
                          <a href="#!" class="secondary-content">
                          <i class="material-icons">remove</i>
                        </a>
                        </div>`;

  collectionContainer.appendChild(listItem);

  //clear input field after adding to list
  inputField.value = "";

  

});


class MakeToDoList {

  list;

  constructor(){ 
    this.list = [];
  }

  addToList(){

  }

  removeFromList(){

  }

}