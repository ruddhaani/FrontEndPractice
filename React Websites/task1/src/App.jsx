import { useState } from "react"

function App() {
  const [obj , setObj] = useState({
    firstName : "",
    lastName : "",
    email : "",
    phone: "",
  })

  const emailRegEx = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9_+-%$#]+\.[a-zA-z]{2,}$/;

  function handleChange(event){
    setObj({...obj , [event.target.name] : event.target.value})
  }

  function handleSubmit(event){
    if(obj.firstName == "" || obj.lastName == ""){
      alert("first name and last name cannot be empty");
    }
  
    if(!emailRegEx.test(obj.email)){
      alert("invalid email");
    }

    setObj({
      firstName : "",
      lastName : "",
      email : "",
      phone : ""
    })
  }

  return (
    <>
     <input type="text" name="firstName" placeholder="First Name" onChange={handleChange}/>
     <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange}/>
     <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
     <input type="phone" name="phone" placeholder="Phone Number" onChange={handleChange}/>
     <input type="submit" value="Submit" onClick={handleSubmit}/>

    </>
  )
}

export default App
