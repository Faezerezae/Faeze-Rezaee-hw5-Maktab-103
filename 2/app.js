// question2(asynchronous =>قابلیت صدا زدن پشت سر هم)
// class StepCounter {
//   constructor() {
//     this.steps = 0;
//   }
//   async increase() {
//     this.steps++;
//   }

//   async decrease() {
//     this.steps--;
//   }

//   async reset() {
//     this.steps = 0;
//   }

//   async read() {
//     console.log(`تعداد قدم ها: ${this.steps}`);
//   }
// }
// const myStepCounter = new StepCounter();
// myStepCounter.increase();
// myStepCounter.increase();
// myStepCounter.increase();
// myStepCounter.read(); // تعداد قدم ها: 3

// myStepCounter.decrease();
// myStepCounter.read(); // تعداد قدم ها: 2

// myStepCounter.reset();
// myStepCounter.read(); // تعداد قدم ها: 0

////////////////////////////
const myStepCounter1 = {
  steps: 0,
  increase() {
    this.steps++;
    return this;
  },
  decrease() {
    this.steps--;
    return this;
  },
  read() {
    console.log(this.steps);
    return this;
  },
  reset() {
    this.steps = 0;
    return this;
  },
};

myStepCounter1.increase().increase().read().reset().increase().read();
