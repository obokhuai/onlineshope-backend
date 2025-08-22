// Write a program "Fizz-Buzz" in the editor of your choice.

// The program should output the numbers from 1 to 100.

// If the number is divisible by 3, the program should output "Fizz" instead of the number.

// If the number is divisible by 5, the program should output "Buzz" instead of the number.

// If both are true, the program should output "FizzBuzz" instead of the number.



function Display() {
  for (let i = 1; i <= 100; i++){
    if (i%3===0 && i%5===0) {
      console.log("FizzBuzz");
    } else if (i%3===0) {
      console.log("Fizz")
    } else if (i%5===0) {
      console.log("Buzz")
    } else {
      console.log(i)
    }
  }
}

Display()

