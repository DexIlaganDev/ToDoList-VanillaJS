// TODO Class: Represents a TODO
class ToDo{
  constructor(title){
    this.title = title;
  }
}

// UI Class : Handle UI Tasks
class UI {

  static displayLists(){

    //pretend this is from localStorage
    const storedLists = [
      {title : "TODO 1"},
      {title : "TODO 2"},
      {title : "TODO 3"},
    ];

    const todos = storedLists;

    todos.forEach( (todo)=>{
      UI.addToDoToList(todo);
    });


  }//end displayLists

  static addToDoToList(todo){
    const list = document.getElementById('collectionContainer');
    const listItem = document.createElement('li');
    listItem.className = "collection-item";
    listItem.innerHTML = `<div>${todo.title}
                            <a href="#!" class="secondary-content">
                            <i class="material-icons removeList">remove</i>
                          </a>
                          </div>`;
    collectionContainer.appendChild(listItem);

  }

  static clearFields(){
    document.getElementById('inputField').value = "";
  }

  static validateField(fieldStringValue){
    let message = "CANNOT ADD BLANK TODO!";
    if ( fieldStringValue == '' || fieldStringValue.trim() == '')  {
      UI.showAlert( message, "red");
      return false;
    }
    return true;
  }
  
  static deleteTodo(el){
    if( el.classList.contains('removeList') ){
      let parent = el.parentElement.parentElement.parentElement.remove();
      console.log(parent);
    }
  }

  static showAlert(mess,stringOfClass){
    let validationToast = new Toast(mess,stringOfClass);
    validationToast.showToast();
  }

}


// Store Class : Handles Storage


//Event : Display TODOS
document.addEventListener('DOMContentLoaded', UI.displayLists );


//Event : Add a Book
document.getElementById('addToDo')
.addEventListener('click', (e)=>{
  
  const inputFieldValue = document.getElementById("inputField").value;

  //Validate ToDo
  if ( !UI.validateField( inputFieldValue ) ) return;

  //Intantiate Book
  const newTodo = new ToDo(inputFieldValue);

  //Add todo to UI
  UI.addToDoToList({title : inputFieldValue});

  //Show success message
  UI.showAlert('List Added Successfully', 'green');

  //Clear fields
  UI.clearFields();

});


//Event : Remove a Book
 document.getElementById('collectionContainer')
 .addEventListener('click', (e)=>{
  UI.deleteTodo(e.target);

  //Show removed list message
  UI.showAlert('List Removed', 'lime');

 });


 //Toast Class
class Toast{

  classString;
  toastMessage;

  constructor (toastMessage, classString){
    this.toastMessage = toastMessage;
    this.classString = classString;
  }

  showToast () {
    M.toast({html: this.toastMessage, classes : this.classString});  
  }

}
