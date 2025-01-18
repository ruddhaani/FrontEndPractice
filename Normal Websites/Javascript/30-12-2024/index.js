//Functions

// function add(a,b){
//     return a + b;
// }

// console.log(add(1,2));

//Other syntax to declare a function
// var add = (a,b)=>{
//     return a + b;
// }

// console.log(add(1,2));

// function isPrime(number){
//     if(number < 2){
//         return false;
//     }

//     for(let i = 2; i < number-1; i++){
//         if(number%i == 0){
//             return false;
//         }
//     }

//     return true;
// }

// for(let i = 1 ; i<=100 ; i++){
//     if(isPrime(i)){
//         console.log(`${i} is Prime number.`);
//     }else{
//         console.log(`${i} is not Prime number.`);
//     }
// }


//You can pass function to a variable
// let isPrime1 = isPrime;

// console.log(isPrime1(3));


//You can pass function as parameter to another function
// function printPrimeNumbersBetween0and100(isPrimeFunc){
//     for(let i = 1 ; i<=100 ; i++){
//         if(isPrimeFunc(i)){
//             console.log(`${i} is Prime number.`);
//         }else{
//             console.log(`${i} is not Prime number.`);
//         }
//     }
// }

// printPrimeNumbersBetween0and100(isPrime);

//Another way to declare function

// let add = function(a,b){
//     return a + b;
// }

// let add = (a,b) => {
//     return a+b;
// }

// console.log(add(3,4));


let arr = [1,2,3,4, "Hello" , "World" , true , 5 , 6];


// arr.forEach((item)=>{
//     if(typeof(item) === "number"){
//         console.log(item);
//     }
// });

//map function is used to return output in array format only

console.log(arr.filter((item)=>{
    if(typeof(item) == "number"){
        return true;
    }
    return false;
}));


let SumOfElements = arr.filter((item)=>{
    if(typeof(item) == "number"){
        return true;
    }
    return false;
}).reduce((a,b) => a+b) / arr.filter((item)=>{
    if(typeof(item) == "number"){
        return true;
    }
    return false;
}).length; 

console.log(SumOfElements);