const form = document.querySelector(".form");
const notification = document.querySelector("#notification");

form.addEventListener("submit", formList);

function formList(e) {
  e.preventDefault();
  notification.style.display = "flex";
  const formData = Object.fromEntries(new FormData(form).entries());
  console.log(formData);
  const top = formData.topNumber;
  const right = formData.rightNumber;
  const buttom = formData.buttomNumber;
  const left = formData.leftNumber;
  const note = formData.note;
  const classInfo = formData.classInfo;

  notification.style.top = `${top}px`;
  notification.style.right = `${right}px`;
  notification.style.bottom = `${buttom}px`;
  notification.style.left = `${left}px`;
  const createNote = document.createElement("p");
  createNote.textContent = note;
  createNote.setAttribute("class", classInfo);
  notification.append(createNote);

  // notification.classList = classInfo;
}
console.log(notification);
