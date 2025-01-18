let apiEndPoint = "http://localhost:5036/api/Employees/";

// async function printNumbers()
// {
//     await setTimeout(()=>{
//         console.log("set timeout");
//     } , 10000)
//     for(let i = 0 ; i<= 1000 ; i++){
//         console.log(i);
//     }

//     return 100;
// }

// const printA = async ()=>{
//     let a = await printNumbers();
//     console.log("A" , a);
// }

// console.log("before")
// printA();
// console.log("Hello World!");

// let promise = new Promise((resolve , reject)=>{
//     console.log("Hello World");

//     let flag = true;
//     if(flag){
//         resolve("success");
//     }else{
//         reject("failure");
//     }
// });

// console.log(promise);

// promise.then((a)=>{
//     console.log(a);
//     return "Hello";
// }).then((c)=>{
//     console.log(c);
// }).catch((b)=>{
//     console.log(b);
// }).finally(()=>{
//     console.log("end");
// });


let promise = fetch(`http://localhost:5036/api/Employees`);

promise.then(function(response){
    console.log(response);
    return response.json();
}).then((data)=>{
    console.log(data);
}).catch(function(e){
    console.log(e)
})