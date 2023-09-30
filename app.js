//question1
const user = {
  name: "John",
  age: 30,
  sayHello: function () {
    return `Hello ${this.name}`;
  },
};
console.log(user.sayHello());

//question2

class pedometer{
  
    constructor() {
      this.steps = 0;
    }
  
    increase() {
      this.steps++;
    }
  
    decrease() {
      this.steps--;
    }
  
    reset() {
      this.steps = 0;
    }
  
    read() {
      console.log(`تعداد قدم ها: ${this.steps}`);
    }
  
  }

  const myStepCounter = new pedometer();

myStepCounter.increase();
myStepCounter.increase();
myStepCounter.increase();
myStepCounter.read(); // تعداد قدم ها: 3

myStepCounter.decrease();
myStepCounter.read(); // تعداد قدم ها: 2

myStepCounter.reset();
myStepCounter.read(); // تعداد قدم ها: 0
