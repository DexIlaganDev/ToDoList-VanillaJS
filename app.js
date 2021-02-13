// TODO Class: Represents a TODO
class ToDo{
  constructor(title, id = 0){
    this.title = title;
    this.id = id;
  }
}

// UI Class : Handle UI Tasks
class UI {

  static todosContainer =[];

  static displayLists(){

    //pretend this is from localStorage
    const storedLists = Store.getTodos();
    const todos = storedLists;

    todos.forEach( (todo)=>{
      UI.addToDoToList(todo);
      UI.todosContainer.push(todo);
    });



  }//end displayLists

  static addToDoToList(todo){
    const list = document.getElementById('collectionContainer');
    const listItem = document.createElement('li');
    listItem.className = `collection-item collection-item-${todo.id}`;
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
      let parent = el.parentElement.parentElement.parentElement
      .remove();


      //Show removed list message
      UI.showAlert('List Removed', 'lime');

    }
  }

  static showAlert(mess,stringOfClass){
    let validationToast = new Toast(mess,stringOfClass);
    validationToast.showToast();
  }

}


// Store Class : Handles Storage
class Store{

  static getTodos(){
    let todos;
    if( localStorage.getItem('todos') === null ){
      todos = [];
    }else{
      todos = JSON.parse( localStorage.getItem('todos') );
    }

    return todos;
  }

  static addTodo(todo){
    const todos = Store.getTodos();
    todos.push(todo);
    localStorage.setItem( 'todos', JSON.stringify( todos ) );

  }

  static removeTodo(el,id){

    let todos = Store.getTodos();
    if( el.classList.contains('removeList') ){
      let classCollectionNumber = el.parentElement.parentElement.parentElement.classList[1].toString();
      const indexWeWant = classCollectionNumber.split('-')[2];
      todos.forEach( (todo, index)=>{
        if( todo.id === indexWeWant ){
          todos.splice(index,1);
        }
        
      });
      console.log(todos);
      localStorage.setItem('todos', JSON.stringify(todos));
    }

  }

}


//Event : Display TODOS
document.addEventListener('DOMContentLoaded', UI.displayLists );

//Event : Add a Book
document.getElementById('addToDo')
.addEventListener('click', (e)=>{
  
  const inputFieldValue = document.getElementById("inputField").value;

  //Validate ToDo
  if ( !UI.validateField( inputFieldValue ) ) return;

  //Intantiate Todo
  const newTodo = new ToDo(inputFieldValue, (++UI.todosContainer.length).toString() );

  //Add todo to UI
  UI.addToDoToList(newTodo);

  //Add to storage
  Store.addTodo( newTodo );

  //Show success message
  UI.showAlert('List Added Successfully', 'green');

  //Clear fields
  UI.clearFields();

});


//Event : Remove a Book
 document.getElementById('collectionContainer')
 .addEventListener('click', (e)=>{
  UI.deleteTodo(e.target);

  //remove todo from LocalStorage
  Store.removeTodo(e.target);

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
