export default class Todo {
    constructor(title, done = false) {
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

        li.prototype = this;
        li.addEventListener("click", this.markDone.bind(li));

        if(this.done == true){
          li.classList.add("done");
        }

        return li;
    }
  
    markDone() {
      if(this.classList.contains("done")){
        this.remove();
        localStorage.removeItem(this.prototype.title);
      } else {
        this.classList.add("done");
        this.prototype.done = true;
        this.prototype.saveToStorage();
      }
    }
  
    add() {
      let todo = this.createElement(); // should return a full <li> with the right classes and innerHTML
      document.querySelector("#todo-list").appendChild(todo);
    }
  
    saveToStorage() {
      localStorage.setItem(this.title, JSON.stringify(this));
    }
  }
  