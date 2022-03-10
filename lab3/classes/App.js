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
            todo.saveToStorage();
            todo.add();
            this.reset();
        }
        
    }
  
    loadFromStorage() {
      let todoItems = [],
          keys = Object.keys(localStorage),
          todos = keys.length;

      while (todos--) {
        todoItems.push(JSON.parse(localStorage.getItem(keys[todos])));
      }
      for(let todoItem of todoItems){
        let todo = new Todo(todoItem.title, todoItem.done);
        todo.add();
      }
    }
  
    reset() {
      document.querySelector("#add-item-text").value = "";
    }
  }
  