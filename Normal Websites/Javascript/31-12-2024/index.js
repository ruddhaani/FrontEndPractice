//Array Functions

// let arr = [10,20,30,"Hello","World",true,40,50];

// console.log(arr.indexOf("Hello"));

// console.log(arr.concat([60,70,80]));

// console.log(arr.includes("Hello"));

// console.log(arr.reverse());

// console.log(arr.sort());

// console.log(arr.slice(3));
// console.log(arr.slice(3,5));

//Converts into string , need to pass a seperator.
// console.log(arr.join(" "));

// let str = "Hello World!";
// console.log(str.split(" ").join(","));



// let arr = [[10,20,30] , [40,50,60] , [70,80,90]];
// console.log(arr.flat());


// console.log(arr.flatMap((item)=> item.slice(1)));


// let arr = [10,20,30,40,50,60,70];

// let functionArray = (arr, func)=>{
//     let newArr = [];
//     for(let i of arr){
//         if(func(i)){
//             newArr.push(i);
//         }
//     }

//     return newArr;
// }

// console.log(functionArray(arr , (x)=>x>40));

// console.log(arr.splice(2,4,100,200));

// console.log(typeof(arr));


//Class

class Person{
    name;
    age;
    height;
    weight;


    constructor(name,age,height,weight){
        this.age = age;
        this.name = name;
        this.height = height;
        this.weight = weight;
    }

    printPersonDetails() {
        console.log(this.name + "\n" + this.age + "\n" + this.weight + "\n" + this.height);
    }

}

let person = new Person("Ani" , 23 , 178 , 80);
person.printPersonDetails();
