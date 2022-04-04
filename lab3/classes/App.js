import Todo from "./Todo.js";

export default class App {
    constructor() {
      console.log("🍕");
      this.setupEventListeners();
      this.loadFromStorage();
    } 
  
    setupEventListeners() {
      console.log("👂🏽");
      // HINT🤩
      // pressing the enter key in the text field triggers the createItem function
      document.querySelector("#add-item-text").addEventListener("keyup", this.createItem.bind(this)); //met bind geef je de huidige betekenis van this door aan de volgende functie, mag dus niet veranderen
      // addEventListener("keyup", this.createItem.bind(this));
      // read up on .bind() -> we need to pass the current meaning of this to the eventListener
      // while testing, feel free to console.log(this) to see what's in it
    }
  
    createItem(e) {
        if(e.key === "Enter" ){
            console.log("📕");
            let inputText = document.querySelector("#add-item-text").value;
            let todo = new Todo(inputText);//dit moet variabel zijn op wat je ingegeven hebt in het tekstvak!
            todo.add();
            todo.saveToStorage();
            this.reset();
        }
        
    }
  
    loadFromStorage() {
    
    let todoItems = JSON.parse(localStorage.getItem("todoItems"));
    // console.log(todoItems);
    if( todoItems !== null ) {
      todoItems.forEach((item) => {
        let todo = new Todo(item["title"], item["done"]);
        //console.log(todo);
        //console.log(item["status"]);
        if(item["done"]){
          todo.add("done");
        }
        else {
          todo.add();
        }              
    });
        console.log(todoItems);
      }
    }
  
    reset() {
      document.querySelector("#add-item-text").value = "";
    }
  }
  