"use strict";
const contactNameElement = (document.getElementById("contact-name"));
const contactPhoneElement = (document.getElementById("contact-phone"));
const contactAgeElement = (document.getElementById("contact-age"));
const saveMaleElement = document.getElementById("male");
const saveFemaleElement = document.getElementById("female");
const submitBtn = document.getElementById("submit-btn");
const sortBtn = document.getElementById("sort-btn");
const contactsListElement = (document.getElementById("contacts-list"));
let contactList = [];
const contactFormData = () => {
    const both = saveFemaleElement.checked && saveMaleElement.checked;
    const storage = both
        ? "both"
        : saveFemaleElement.checked
            ? "female"
            : "male";
    return {
        name: contactNameElement === null || contactNameElement === void 0 ? void 0 : contactNameElement.value,
        phone: contactPhoneElement === null || contactPhoneElement === void 0 ? void 0 : contactPhoneElement.value,
        age: contactAgeElement === null || contactAgeElement === void 0 ? void 0 : contactAgeElement.value,
        id: crypto.randomUUID(),
        storage,
    };
};
const validateFormData = (contact) => {
    const validateData = {
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
        validateData.fields = Object.assign(Object.assign({}, validateData.fields), { phone: "phone is required!" });
    }
    if (!contact.age) {
        validateData.isValid = false;
        validateData.fields = Object.assign(Object.assign({}, validateData.fields), { age: "age is required!" });
    }
    const existsContact = contactList.find((item) => item.phone === contact.phone);
    if (existsContact) {
        validateData.isValid = false;
        validateData.fields = {
            phone: "id already Exists!",
        };
    }
    return validateData;
};
const saveNewContact = (contact) => {
    var _a, _b, _c, _d, _e, _f;
    const validateContact = validateFormData(contact);
    if (validateContact.isValid) {
        contactList.push(contact);
    }
    else {
        if ((_a = validateContact.fields) === null || _a === void 0 ? void 0 : _a.name) {
            // contactNameElement.insertAdjacentHTML(
            //   "afterend",
            //   validateContact.fields?.name
            // );
            // setTimeout(() => {
            //   contactAgeElement.insertAdjacentHTML("afterend", "");
            // }, 5000);
            alert((_b = validateContact.fields) === null || _b === void 0 ? void 0 : _b.name);
        }
        if ((_c = validateContact.fields) === null || _c === void 0 ? void 0 : _c.phone) {
            // contactAgeElement.insertAdjacentHTML(
            //   "afterend",
            //   validateContact.fields?.phone
            // );
            // setTimeout(() => {
            //   contactAgeElement.insertAdjacentHTML("afterend", "");
            // }, 5000);
            alert((_d = validateContact.fields) === null || _d === void 0 ? void 0 : _d.phone);
        }
        if ((_e = validateContact.fields) === null || _e === void 0 ? void 0 : _e.age) {
            // contactAgeElement.insertAdjacentHTML(
            //   "afterend",
            //   validateContact.fields?.age
            // );
            // setTimeout(() => {
            //   contactAgeElement.insertAdjacentHTML("afterend", "");
            // }, 5000);
            alert((_f = validateContact.fields) === null || _f === void 0 ? void 0 : _f.age);
        }
    }
    return contactList;
};
const deleteContact = (phone) => {
    const filteredContactList = contactList.filter((item) => item.phone !== phone);
    contactList = filteredContactList;
    renderContactsList();
};
const contactListItemelement = (contact) => {
    const contactListItem = document.createElement("li");
    contactListItem.setAttribute("class", "border-bottom py-2 d-flex justify-content-between align-items-center");
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
    contactListItemInfo.append(contactNameElement, contactPhoneElement, contactAgeElement);
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
    const deleteContactAction = document.createElement("button");
    deleteContactAction.setAttribute("class", "btn");
    deleteContactAction.innerText = "Delete";
    deleteContactAction.addEventListener("click", () => deleteContact(contact.phone));
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
    const contacts = saveNewContact(contactFormData());
    renderContactsList();
    console.log(contacts);
};
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", handleSubmitContact);
// sortBtn?.addEventListener("click"()=>sortContact(contact.age))
// const sortContact=(age:string)=>{
//   const filteredContactSort = contactList.filter(
//     (item) => item.age !== age
//   );
//   contactList = filteredContactSort;
//   contactList.sort((a, b) => a.age - b.age);
//   renderContactsList();
// }
