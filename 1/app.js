//question1
const user = {
    name: "John",
    age: 30,
    sayHello: function () {
      return `Hello ${this.name}`;
    },
  };
  console.log(user.sayHello());