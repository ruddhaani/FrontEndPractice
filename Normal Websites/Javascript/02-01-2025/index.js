// document.getElementById("para1");

//document.querySelector("#para1");

//document.querySelectorAll(".para");

// let paragraph1 = document.getElementById("para1");

// paragraph1.innerHTML = "<h1>hello world</h1><hr> <br>"

// let handleInput = ()=>{
//     let inputTag = document.getElementById('age');
//     let err = document.getElementById('ageErrorMessage');
//     let age = inputTag.value;
//     if(age > 150 || age < 0){
//         err.innerText = "Please enter correct age";
//         err.style.display = "block";
//     }else{
//         console.log(age);
//         err.style.display = "none";
//         if(age > 18){
//             err.style.color = "green";
//             err.innerText = "You are eligible to vote";
//             err.style.display = "block";
//         }else{
//             err.style.display = "none";
//         }
//     }
    

// }


let handleBMIOutput = ()=>{
    let height = document.getElementById("height");
    let weight = document.getElementById("weight");

    let bmi = weight.value / (height.value * height.value);

    let bmiValue = document.getElementById("bmiValue");
    bmiValue.innerText = bmi;
    bmiValue.style.display = "block";
    
    if(bmi >= 0 && bmi < 18.5){
        bmiValue.style.color = "green";
    }else if(bmi >= 18.5 && bmi <24.9){
        bmiValue.style.color = "yellow";
    }else if(bmi >= 25 && bmi <29.9){
        bmiValue.style.color = "blue";
    }else if(bmi >=30 && bmi <34.9){
        bmiValue.style.color = "orange";
    }else{
        bmiValue.style.color = "red";
    }
}