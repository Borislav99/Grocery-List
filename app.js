(function () {
  /* ----- Klase ----- */
  class UI {
    //date
    setDate() {
      let mjeseci = [
        `Jan`,
        `Feb`,
        `Mar`,
        `Apr`,
        `May`,
        `Jun`,
        `Jul`,
        `Aug`,
        `Sep`,
        `Oct`,
        `Nov`,
        `Dec`,
      ];
      let dani = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
      let date = new Date();
      let day = date.getDay();
      let month = date.getMonth();
      let number = date.getDate();
      day = dani[day];
      month = mjeseci[month];
      let output = `${day} ${number} ${month}`;
      todayDate.innerText = output;
    }
    //open and close input
    openCloseInput(value) {
      if (value === 'true') {
        inputContainer.classList.toggle("hide");
      } else if (value === 'false') {
        inputContainer.classList.add("hide");
        addTask.classList.remove("hide");
        input.value = "";
      }
    }
    //hide task
    hideTask() {
      addTask.classList.remove("show");
      addTask.classList.add("hide");
    }
    //open and show btn
    showHideBtn(value) {
      if (value === 'true') {
        submit.disabled = false;
        submit.classList.add("enabled");
      } else if (value === 'false') {
        submit.disabled = true;
        submit.classList.remove("enabled");
      }
    }
    //add to list
    addToList(value) {
      let objectId;
      if (localStorage.length > 0) {
        let list = JSON.parse(localStorage.getItem("groceryList"));
        let ids = [];
        list.forEach((item) => {
          ids.push(item.id);
        });
        let idMax = Math.max(...ids);
        idMax++;
        objectId = idMax;
      }
      else {
        objectId = id;
      };
      if (objectId === -Infinity) {
        objectId = 0;
      }
      let object = {
        name: value,
        id: objectId,
      };
      id++;
      this.addToDOM(object);
      this.addToArray(object);
      this.addToStorage(object);
    }
    //add to storage
    addToStorage(object) {
      Storage.StorageAdd(object);
    }
    //add to DOM
    addToDOM(object) {
      let div = document.createElement("div");
      div.classList.add("singleItem");
      div.innerHTML = `
                 <div class="singleItem-text">
              <span class="text" data-id="${object.id}">${object.name}</span>
            </div>
            <div class="singleItem-icons">
              <div class="allIcons">
                <a href="#" class="checkIcon icon" data-id="${object.id}"
                  ><i class="far fa-check-circle"></i>
                </a>
                <a href="#" class="editIcon icon" data-id="${object.id}"
                  ><i class="far fa-edit ed"></i>
                </a>
                <a href="#" class="removeIcon icon" data-id="${object.id}"
                  ><i class="far fa-times-circle rem"></i>
                </a>
              </div>
            </div>
     `;
      taskList.appendChild(div);
    }
    //check icon
    checkIcon(icon, text) {
      text.classList.toggle("strike");
      icon.classList.toggle("low");
    }
    //remove icon
    removeIcon(value, id) {
      taskList.removeChild(value);
      let list = JSON.parse(localStorage.getItem("groceryList"));
      let filter = list.filter(function (item) {
        return item.id !== id;
      });
      localStorage.setItem("groceryList", JSON.stringify(filter));
    }
    //edit icon
    editIcon(text) {
      this.hideTask();
      this.openCloseInput('true');
      input.value = text;
      submit.value = "Edit Grocery";
      submit.removeEventListener("click", this.submitEvent);
      submit.addEventListener("click", this.editEvent);
      this.showHideBtn('true');
    }
    //edit event
    editEvent(event) {
      event.preventDefault();
      let id;
      let ui = new UI();
      let arr = [];
      let list = JSON.parse(localStorage.getItem('groceryList'));
      list.forEach((item) => {
        arr.push(item.id);
      });
      if (arr.length === 0) {
        id = 0;
      } else {
        id = Math.max(...arr) + 1;
      }
      let text = input.value;
      let object = {
        name: text,
        id: id,
      };
      ui.addToArray(object);
      ui.addToDOM(object);
      Storage.StorageAdd(object);
      addTask.classList.add("show");
      ui.openCloseInput('false');
      ui.blockOther('false');
      submit.removeEventListener("click", ui.editEvent);
      submit.addEventListener("click", ui.submitEvent);
      submit.value = "Add Grocery";
    }
    //add to array
    addToArray(object) {
      objectsList.push(object);
    }
    //submit event
    submitEvent() {
      let value = input.value;
      ui.showHideBtn('false');
      ui.openCloseInput('false');
      ui.addToList(value);
    }
    //on load
    onLoad() {
      let list = JSON.parse(localStorage.getItem("groceryList"));
      if (list) {
        list.forEach((item) => {
          let object = {
            name: item.name,
            id: item.id,
          };
          this.addToDOM(object);
        });
      }
    }
    blockOther(value) {
      let edits = document.querySelectorAll('.ed');
      if (value === 'true') {
        edits.forEach(item => {
          item.classList.add('disableOthers');
          item.parentElement.classList.add('disableOthers', 'low');
        })
      }
      else if (value === 'false') {
        edits.forEach(item => {
          item.classList.remove('disableOthers');
          item.parentElement.classList.remove('disableOthers', 'low');
        })
      }
    }
  }
  //storage
  class Storage {
    //add to local storage
    static StorageAdd(object) {
      let list;
      if (localStorage.getItem("groceryList")) {
        list = JSON.parse(localStorage.getItem("groceryList"));
      } else {
        list = [];
      }
      list.push(object);
      localStorage.setItem("groceryList", JSON.stringify(list));
    }
  }
  /* ----- Varijable ----- */
  let form = document.querySelector(".form");
  let input = document.querySelector(".input");
  let addTask = document.querySelector(".addTask");
  let cancelBtn = document.querySelector(".cancelTask");
  let submit = document.querySelector(".inputTask");
  let todayDate = document.querySelector(".todayDate");
  let inputContainer = document.querySelector(".input-container");
  let taskList = document.querySelector(".taskList");
  let id = 0;
  let objectsList = [];
  /* ----- Eventi ----- */
  let ui = new UI();
  //on Load
  document.addEventListener("DOMContentLoaded", () => {
    ui.setDate();
    ui.onLoad();
  });
  //add Task
  addTask.addEventListener("click", () => {
    ui.openCloseInput('true');
    ui.hideTask();
  });
  //cancel Btn
  cancelBtn.addEventListener("click", () => {
    ui.openCloseInput('false');
    ui.showHideBtn('false');
  });
  //form
  form.addEventListener("keyup", () => {
    let value = input.value;
    if (value.length > 0) {
      ui.showHideBtn('true');
    } else {
      ui.showHideBtn('false');
    }
  });
  //submit
  submit.addEventListener("click", ui.submitEvent);
  //event prop
  taskList.addEventListener("click", (event) => {
    event.preventDefault();
    let value =
      event.target.parentElement.parentElement.parentElement.parentElement
        .children[0].children[0];
    let textValue = value.textContent;
    let id = parseInt(event.target.parentElement.dataset.id);
    let singleItem =
      event.target.parentElement.parentElement.parentElement.parentElement;
    //check icon
    if (event.target.parentElement.classList.contains("checkIcon")) {
      ui.checkIcon(event.target, value);
    }
    //edit
    else if (event.target.parentElement.classList.contains("editIcon")) {
      ui.removeIcon(singleItem, id);
      ui.editIcon(textValue, id);
      ui.blockOther('true');
    }
    //remove 
    else if (event.target.parentElement.classList.contains("removeIcon")) {
      ui.removeIcon(singleItem, id);
    }
  });
})();
