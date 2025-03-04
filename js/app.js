let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

//initial
function initial() {
  preventClick();
  selectScored();
  inputCredits();
  deleteFun();
}

initial();
// Animate

const timeLine = new TimelineMax();

// parameter1  Controled object
// parameter2  duration
// parameter3  original status
// parameter4  endding status
// parameter5  early to start

timeLine
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: "1" }, { opacity: "0" });

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

// Forbidded Enter Key
addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//Prevent button of form cannot submit

function preventClick() {
  let allButtons = document.querySelectorAll("button");
  allButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
}

//After selecting option, it will change color and GPA.

function selectScored() {
  let allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target); //e.target is select tag
    });
  });
}

//After inputing option, it will change GPA.
function inputCredits() {
  let allCredits = document.querySelectorAll(".class-credits");
  allCredits.forEach((credit) => {
    credit.addEventListener("input", () => {
      setGPA();
    });
  });
}

function changeColor(target) {
  // console.log(target);
  switch (target.options[target.selectedIndex].text) {
    case "A":
    case "A-":
      target.style.backgroundColor = "lightgreen";
      target.style.color = "black";
      break;
    case "B":
    case "B+":
    case "B-":
      target.style.backgroundColor = "yellow";
      target.style.color = "black";
      break;
    case "C":
    case "C+":
    case "C-":
      target.style.backgroundColor = "orange";
      target.style.color = "black";
      break;
    case "D":
    case "D+":
    case "D-":
      target.style.backgroundColor = "red";
      target.style.color = "black";
      break;
    case "F":
      target.style.backgroundColor = "gray";
      target.style.color = "white";
      break;
    default:
      target.style.backgroundColor = "white";
      break;
  }
}

function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credits");
  let select = document.querySelectorAll(".select");
  let sum = 0;
  let creditSum = 0;
  credits.forEach((credit, index) => {
    if (credit.valueAsNumber > 6) {
      credit.valueAsNumber = 6;
    } else if (credit.valueAsNumber < 0) {
      credit.valueAsNumber = 0;
    }
    if (credit.valueAsNumber && select[index].value) {
      creditSum += credit.valueAsNumber;
    }
  });

  for (let i = 0; i < formLength; i++) {
    if (credits[i].valueAsNumber && select[i].value) {
      sum += credits[i].valueAsNumber * select[i].value;
    }
  }

  // console.log(creditSum);
  // console.log(sum);
  let result = (0.0).toFixed(2);
  if (creditSum != 0) {
    result = (sum / creditSum).toFixed(2);
  }
  document.getElementById("result-gpa").innerText = result;
}

// Add new form

let plusBtn = document.querySelector(".plus-btn");

plusBtn.addEventListener("click", () => {
  let allInputs = document.querySelector(".all-inputs");
  let newForm = document.createElement("form");
  newForm.innerHTML = `<div class="grader">
            <input
              type="text"
              placeholder="class category"
              class="class-type"
              list="opt"
            >
            <input
              type="text"
              placeholder="class number"
              class="class-number"
            >
            <input
              type="number"
              placeholder="credits"
              min="0"
              max="6"
              class="class-credits"
            >
            <select
              name="select"
              class="select"
            >
              <option value=""></option>
              <option value=4.0>A</option>
              <option value=3.7>A-</option>
              <option value=3.4>B+</option>
              <option value=3.0>B</option>
              <option value=2.7>B-</option>
              <option value=2.4>C+</option>
              <option value=2.0>C</option>
              <option value=1.7>C-</option>
              <option value=1.4>D+</option>
              <option value=1.0>D</option>
              <option value=0.7>D-</option>
              <option value=0.0>F</option>
            </select>
            <button class="trash-button">
              <i class="fas fa-trash"></i>
            </button>
          </div>
      `;
  newForm.classList.add("remove");
  allInputs.appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards";

  initial();
});

// delete form
function deleteFun() {
  let deleteBtns = document.querySelectorAll(".trash-button");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
          initial();
        }
      );
    });
  });
}

//Descending
let dec = document.querySelector(".sort-descending");
dec.addEventListener("click", () => {
  handleSorting("descending");
});

//Ascending
let asc = document.querySelector(".sort-ascending");
asc.addEventListener("click", () => {
  handleSorting("ascending");
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];
  graders.forEach((grade) => {
    let className = grade.children[0].value;
    let classNumber = grade.children[1].value;
    let classCredit = grade.children[2].value;
    let classGrade = grade.children[3].value;
    if (
      !(
        className == "" &&
        classNumber == "" &&
        classCredit == "" &&
        classGrade == ""
      )
    ) {
      let classObject = { className, classNumber, classCredit, classGrade };
      objectArray.push(classObject);
    }
  });
  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }
  // console.log(objectArray);
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";
  for (let i = 0; i < objectArray.length; i++) {
    // console.log(objectArray[i]);
    allInputs.innerHTML += `<form>
          <div class="grader">
            <input
              type="text"
              placeholder="class category"
              class="class-type"
              list="opt"
              value=${objectArray[i].className}
            >
            <input
              type="text"
              placeholder="class number"
              class="class-number"
              value=${objectArray[i].classNumber}
            >
            <input
              type="number"
              placeholder="credits"
              min="0"
              max="6"
              class="class-credits"
              value=${objectArray[i].classCredit}
            >
            <select
              name="select"
              class="select"
            >
              <option value=""></option>
              <option value=4.0>A</option>
              <option value=3.7>A-</option>
              <option value=3.4>B+</option>
              <option value=3.0>B</option>
              <option value=2.7>B-</option>
              <option value=2.4>C+</option>
              <option value=2.0>C</option>
              <option value=1.7>C-</option>
              <option value=1.4>D+</option>
              <option value=1.0>D</option>
              <option value=0.7>D-</option>
              <option value=0.0>F</option>
            </select>
            <button class="trash-button">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </form>`;
  }
  initial();
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].classGrade;
    changeColor(graders[i].children[3]);
  }
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    // console.log(a1, a2);
    // console.log(a1.length, a2.length);
    if (a1[i].classGrade > a2[j].classGrade) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    // console.log(a1);
    result.push(a1[i]);
    i++;
  }

  while (j < a2.length) {
    // console.log(a2);
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return [];
  }
  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
