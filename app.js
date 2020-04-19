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
    addToList(value){
     console.log(value);
     let object = {
      name: value,
      id:0,
     }
     
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
  });
  form.addEventListener("keypress", (event) => {
    let value = input.value;
    if (value.length > 1) {
      ui.showBtn();
    }
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
