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
                            <i class="material-icons">remove</i>
                          </a>
                          </div>`;
    collectionContainer.appendChild(listItem);

  }
  

}


// Store Class : Handles Storage


//Event : Display TODOS
document.addEventListener('DOMContentLoaded', UI.displayLists );
