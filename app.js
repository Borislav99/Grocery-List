(function () {
  //klase
  class UI {
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
    openInput() {
      inputContainer.classList.toggle("hide");
    }
    closeInput() {
      inputContainer.classList.add("hide");
      addTask.classList.remove("hide");
      input.value = "";
    }
    hideTask() {
      addTask.classList.remove("show");
      addTask.classList.add("hide");
    }
    showBtn() {
      submit.disabled = false;
      submit.classList.add("enabled");
    }
    hideBtn() {
      submit.disabled = true;
      submit.classList.remove("enabled");
    }
    addToList(value) {
      let objectId = id;
      let object = {
        name: value,
        id: objectId,
      };
      id++;
      this.addToDOM(object);
      this.addToArray(object);
    }
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
                  ><i class="far fa-edit"></i>
                </a>
                <a href="#" class="removeIcon icon" data-id="${object.id}"
                  ><i class="far fa-times-circle"></i>
                </a>
              </div>
            </div>
     `;
      taskList.appendChild(div);
    }
    checkIcon(icon, text) {
      text.classList.toggle("strike");
      icon.classList.toggle("low");
    }
    removeIcon(value, id) {
      taskList.removeChild(value);
      objectsList = objectsList.filter(function (item) {
        return item.id !== id;
      });
    }
    editIcon(text) {
      this.hideTask();
      this.openInput();
      input.value = text;
      submit.value = "Edit Grocery";
      submit.removeEventListener("click", this.submitEvent);
      submit.addEventListener("click", this.editEvent);
      this.showBtn();
    }
    editEvent() {
     let id;
      let ui = new UI();
      let arr = [];
      objectsList.forEach((item) => {
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
      addTask.classList.add("show");
      ui.closeInput();
      submit.removeEventListener("click", ui.editEvent);
      submit.addEventListener("click", ui.submitEvent);
      submit.value = "Add Grocery";
    }
    addToArray(object) {
      objectsList.push(object);
    }
    submitEvent(event) {
      let value = input.value;
      ui.hideBtn();
      ui.closeInput();
      ui.addToList(value);
    }
  }
  //varijable
  let todayDate = document.querySelector(".todayDate");
  let addTask = document.querySelector(".addTask");
  let form = document.querySelector(".form");
  let input = document.querySelector(".input");
  let submit = document.querySelector(".inputTask");
  let cancelBtn = document.querySelector(".cancelTask");
  let inputContainer = document.querySelector(".input-container");
  let taskList = document.querySelector(".taskList");
  let id = 0;
  let objectsList = [];
  //eventi
  let ui = new UI();
  document.addEventListener("DOMContentLoaded", (event) => {
    ui.setDate();
  });
  addTask.addEventListener("click", (event) => {
    ui.openInput();
    ui.hideTask();
  });
  cancelBtn.addEventListener("click", (event) => {
    ui.closeInput();
    ui.hideBtn();
  });
  form.addEventListener("keyup", (event) => {
    let value = input.value;
    if (value.length > 0) {
      ui.showBtn();
    } else {
      ui.hideBtn();
    }
  });
  submit.addEventListener("click", ui.submitEvent);
  taskList.addEventListener("click", (event) => {
    event.preventDefault();
    let value =
      event.target.parentElement.parentElement.parentElement.parentElement
        .children[0].children[0];
    let textValue = value.textContent;
    let id = parseInt(event.target.parentElement.dataset.id);
    let singleItem =
      event.target.parentElement.parentElement.parentElement.parentElement;
    if (event.target.parentElement.classList.contains("checkIcon")) {
      ui.checkIcon(event.target, value);
    } else if (event.target.parentElement.classList.contains("editIcon")) {
      ui.removeIcon(singleItem, id);
      ui.editIcon(textValue, id);
    } else if (event.target.parentElement.classList.contains("removeIcon")) {
      ui.removeIcon(singleItem);
    }
  });
})();

let inputCart = document.querySelector(".inputTask");
inputCart.addEventListener("click", (event) => {
  event.preventDefault();
});
