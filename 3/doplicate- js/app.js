const form = document.querySelector('.form');
const show = document.querySelector('.show');
const ListSort = document.querySelector('.list-user-sort')
console.log(form)

eventListener();

function eventListener() {
    form.addEventListener('submit', getFrom)
}

let arrList = []

function getFrom(e) {
    e.preventDefault()
    const listData = Object.fromEntries(new FormData(form).entries())
    arrList.push(listData)
    // const check = Dataobj(listData)
    console.log(arrList)
    form.reset()


    Sortage(arrList)
}

console.log(show)



function Sortage(data) {

    const sort = data.sort((a, b) => +a.age - +b.age)
    console.log(sort)
    sort.forEach(element => {
        const div = document.createElement('div')
        div.innerHTML = ''
        div.innerHTML = `
        <ul class="ulList">
        <li>
        <p>${element.fName}</p>
        <p>${element.age}</p>
        </li>
        
        </ul>
        `
        ListSort.appendChild(div)

    });

};



// let thebigest = userArrayObject.sort((a, b) => +b.age - +a.age);

// let theBigIcome = userArrayObject.reduce((acc, item) => {
//     return acc += +item.income
// }, 0) / userArrayObject.length

// console.log(`Average salary ::${theBigIcome}`)


// console.log(`the oldest ${thebigest[0].myName}`)

// function Dataobj(data) {
//     console.log(data)
//     const arr = []
//     arr.push(data)
//     return arr
// }