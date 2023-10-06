const contactNameElement = <HTMLInputElement>(
  document.getElementById("contact-name")
);
const contactPhoneElement = <HTMLInputElement>(
  document.getElementById("contact-phone")
);

const contactAgeElement = <HTMLInputElement>(
  document.getElementById("contact-age")
);

const saveMaleElement = <HTMLInputElement>document.getElementById("male");
const saveFemaleElement = <HTMLInputElement>document.getElementById("female");
const submitBtn = <HTMLButtonElement>document.getElementById("submit-btn");
const sortBtn = <HTMLButtonElement>document.getElementById("sort-btn");
const contactsListElement = <HTMLUListElement>(
  document.getElementById("contacts-list")
);
const formActionsElement = <HTMLDivElement>(
  document.getElementById("form-actions")
);

type contactInfoType = {
  name: string;
  phone: string;
  age: string;
  id: string;
  storage: "male" | "female" | "both";
};

let contactList: Array<contactInfoType> = [];

const contactFormData = (): contactInfoType => {
  const both = saveFemaleElement.checked && saveMaleElement.checked;
  const storage: contactInfoType["storage"] = both
    ? "both"
    : saveFemaleElement.checked
    ? "female"
    : "male";

  return {
    name: contactNameElement?.value,
    phone: contactPhoneElement?.value,
    age: contactAgeElement?.value,
    id: crypto.randomUUID(),
    storage,
  };
};

function editFormActionsHandler(id: string) {
  const cancelEditElement = document.createElement("button");
  cancelEditElement.className = "btn mb-3 w-100 btn-primary";
  cancelEditElement.innerHTML = "Cancel";
  submitBtn.innerText = "Edit";
  submitBtn.dataset.mode = "edit";
  submitBtn.dataset.id = id;
  cancelEditElement.addEventListener("click", () => {
    cancelEditElement.remove();
    submitBtn.innerText = "Submit";
    submitBtn.dataset.mode = "create";
    submitBtn.dataset.id = "";
    resetForm();
  });
  formActionsElement.children.length !== 2 &&
    formActionsElement.append(cancelEditElement);
}

function resetForm(contact?: contactInfoType, edit?: boolean) {
  contactNameElement.value = contact?.name ?? "";
  contactPhoneElement.value = contact?.phone ?? "";
  saveFemaleElement.checked =
    contact?.storage === "female" || contact?.storage === "both" ? true : false;
  saveMaleElement.checked =
    contact?.storage === "male" || contact?.storage === "both" ? true : false;
  if (edit) {
    editFormActionsHandler(contact?.id ?? "");
  }
}

type ValidateFormInfoType = {
  isValid: boolean;
  fields?: {
    // [key:keyof contactInfoType | string]:string;
    name?: string;
    phone?: string;
    age?: string;
    id?: string;
  };
};

const validateFormData = (contact: contactInfoType): ValidateFormInfoType => {
  const validateData: ValidateFormInfoType = {
    isValid: true,
    fields: {},
  };
  if (!contact.name) {
    validateData.isValid = false;
    validateData.fields = {
      name: "name is required!",
    };
  }
  if (!contact.phone) {
    validateData.isValid = false;
    validateData.fields = {
      ...validateData.fields,
      phone: "phone is required!",
    };
  }
  if (!contact.age) {
    validateData.isValid = false;
    validateData.fields = {
      ...validateData.fields,
      age: "age is required!",
    };
  }

  const existsContact = contactList.find(
    (item) => item.phone === contact.phone
  );
  if (existsContact) {
    validateData.isValid = false;
    validateData.fields = {
      phone: "id already Exists!",
    };
  }
  return validateData;
};

const saveNewContact = (contact: contactInfoType): Array<contactInfoType> => {
  const validateContact = validateFormData(contact);

  if (validateContact.isValid) {
    contactList.push(contact);
  } else {
    if (validateContact.fields?.name) {
      // contactNameElement.insertAdjacentHTML(
      //   "afterend",
      //   validateContact.fields?.name
      // );
      // setTimeout(() => {
      //   contactAgeElement.insertAdjacentHTML("afterend", "");
      // }, 5000);
      alert(validateContact.fields?.name);
    }
    if (validateContact.fields?.phone) {
      // contactAgeElement.insertAdjacentHTML(
      //   "afterend",
      //   validateContact.fields?.phone
      // );
      // setTimeout(() => {
      //   contactAgeElement.insertAdjacentHTML("afterend", "");
      // }, 5000);
      alert(validateContact.fields?.phone);
    }
    if (validateContact.fields?.age) {
      // contactAgeElement.insertAdjacentHTML(
      //   "afterend",
      //   validateContact.fields?.age
      // );
      // setTimeout(() => {
      //   contactAgeElement.insertAdjacentHTML("afterend", "");
      // }, 5000);
      alert(validateContact.fields?.age);
    }
  }
  return contactList;
};

const deleteContact = (id: string) => {
  const filteredContactList = contactList.filter((item) => item.id !== id);
  contactList = filteredContactList;
  renderContactsList();
};

const contactListItemelement = (contact: contactInfoType) => {
  const contactListItem = document.createElement("li");
  contactListItem.setAttribute(
    "class",
    "border-bottom py-2 d-flex justify-content-between align-items-center"
  );

  const contactListItemInfo = document.createElement("div");
  contactListItemInfo.setAttribute("class", "d-flex flex-column");
  const contactNameElement = document.createElement("h4");
  contactNameElement.innerText = contact.name;
  contactNameElement.setAttribute("class", "mb-0");
  const contactPhoneElement = document.createElement("h6");
  contactPhoneElement.setAttribute("class", "mb-0");
  contactPhoneElement.innerText = contact.phone;
  const contactAgeElement = document.createElement("h7");
  contactAgeElement.setAttribute("class", "mb-0");
  contactAgeElement.innerText = contact.age;
  contactListItemInfo.append(
    contactNameElement,
    contactPhoneElement,
    contactAgeElement
  );
  const contactStorageElement = document.createElement("div");
  contactStorageElement.setAttribute("class", "d-flex mt-1 gap-1");
  const femaleStorageElement = document.createElement("span");
  femaleStorageElement.setAttribute("class", "badge bg-info text-white");
  femaleStorageElement.innerText = "female";
  const maleStorageElement = document.createElement("span");
  maleStorageElement.setAttribute("class", "badge bg-info text-white");
  maleStorageElement.innerText = "male";
  if (contact.storage === "both") {
    contactStorageElement.append(maleStorageElement, femaleStorageElement);
  }
  if (contact.storage === "male") {
    contactStorageElement.append(maleStorageElement);
  }
  if (contact.storage === "female") {
    contactStorageElement.append(femaleStorageElement);
  }
  contactListItemInfo.append(contactStorageElement);

  const contactListItemActions = document.createElement("div");
  contactListItemActions.setAttribute("class", "d-flex ");

  const editContactAction = document.createElement("button");
  editContactAction.setAttribute("class", "btn");
  editContactAction.innerText = "Edit";
  editContactAction.addEventListener("click", () => {
    resetForm(contact, true);
  });

  const deleteContactAction = document.createElement("button");
  deleteContactAction.setAttribute("class", "btn");
  deleteContactAction.innerText = "Delete";

  deleteContactAction.addEventListener("click", () =>
    deleteContact(contact.id)
  );
  contactListItemActions.append(editContactAction, deleteContactAction);

  contactListItem.append(contactListItemInfo, contactListItemActions);

  return contactListItem;
};

function renderContactsList() {
  contactsListElement.innerHTML = "";
  contactList.forEach((item) => {
    contactsListElement.append(contactListItemelement(item));
  });
}

const handleSubmitContact = () => {
  saveNewContact(contactFormData());
  renderContactsList();
  resetForm();
};

const handleEditContact = (id: string) => {
  if (!id) return;
  const currentContactIndex = contactList.findIndex(
    (contact) => contact.id === id
  );
  console.log(contactList);
  console.log(currentContactIndex);
  const updatedContact = contactFormData();
  contactList.splice(currentContactIndex, 1, {
    ...updatedContact,
    id: id,
  });
  renderContactsList();
};

submitBtn?.addEventListener("click", () => {
  submitBtn.dataset.mode === "edit"
    ? handleEditContact(submitBtn.dataset.id ?? "")
    : handleSubmitContact();
});

sortBtn?.addEventListener("click", () => sortContact());

const sortContact = () => {
  console.log(contactList);
  contactList.sort((a: contactInfoType, b: contactInfoType) => {
    return Number(a.age) - Number(b.age);
  });
  console.log(contactList);
  renderContactsList();
};
