export default class Todo {
    constructor(title, done) {
      // HINT🤩
      // use a constructor to set basic property values
      this.title = title;
      this.done = done;
    }
  
    createElement() {
        let li = document.createElement("li");
        li.innerHTML = this.title;

        if(li.innerHTML.includes("high:")){
            li.classList.add("prior-high");
        } else if (li.innerHTML.includes("medium:")) {
            li.classList.add("prior-medium");
        } else if (li.innerHTML.includes("low:")) {
            li.classList.add("prior-low");
        } else {
            li.classList.add("prior-medium");
        }

        //li.prototype = this;
        li.addEventListener("click", this.markDone.bind(li));

        if(this.done === true){
          li.classList.add("done");
        }

        return li;
    }
  
    markDone() {
      let todoItems = localStorage.getItem("todoItems");
      todoItems = JSON.parse(todoItems) || "todoItems";

      if(this.classList.contains("done")){
        this.remove();
        todoItems.forEach((item, index) => {
          if(item["title"] === this.innerHTML){
            todoItems.splice(index,1);
            localStorage.setItem("todoItems", JSON.stringify(todoItems));
          }
        });
      } else {
        this.classList.add("done");
        todoItems.forEach((item, index) => {
          if(item["title"] === this.innerHTML) {
            let todoItem = todoItems[index];
            todoItem["done"] = true;
            localStorage.setItem("todoItems", JSON.stringify(todoItems));
          }
        });
      }

      //   localStorage.removeItem(this.title);
      // } else {
      //   this.classList.add("done");
      //   this.done = true;
      //   this.saveToStorage();
      // }
    }
  
    add(done) {
      let todo = this.createElement(); // should return a full <li> with the right classes and innerHTML
      if (done) {
        todo.classList.add("done");
      }
      document.querySelector("#todo-list").appendChild(todo);
    }
  
    saveToStorage() {
      // localStorage.setItem(todoItems, JSON.stringify(this));
      let todoItems = localStorage.getItem("todoItems");
      todoItems = JSON.parse(todoItems) || [];

      todoItems.push({"title": this.title, "status": this.done});
      localStorage.setItem("todoItems", JSON.stringify(todoItems));

    }
  } 
  