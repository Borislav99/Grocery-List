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
  }
  //varijable
  let todayDate = document.querySelector(".todayDate");
  let addTask = document.querySelector(".addTask");
  let form = document.querySelector(".form");
  let input = document.querySelector(".input");
  let submit = document.querySelector(".inputTask");
  let cancelBtn = document.querySelector(".cancelTask");
  let inputContainer = document.querySelector(".input-container");
  let taskList = document.querySelector('.taskList');
  let id = 0;
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
    }
    else{
     ui.hideBtn();
    }
    console.log(value.length);
    
  });
  submit.addEventListener("click", (event) => {
    let value = input.value;
    ui.hideBtn();
    ui.closeInput();
    ui.addToList(value);
  });
})();

let inputCart = document.querySelector(".inputTask");
inputCart.addEventListener("click", (event) => {
  event.preventDefault();
});
