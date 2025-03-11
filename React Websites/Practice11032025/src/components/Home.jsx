import React, { useEffect, useState } from 'react'

const Home = () => {
  const [count , setCount] = useState(1);

  
  // useEffect(() => {
  //   console.log("Everytimee");
  // });

  // useEffect(() => {
  //   console.log("First");
  // } , []);

  // useEffect(() => {
  //   console.log("Count change");
  // } ,[count]);


  function handleCount(){
    setCount(count + 1);
  }
  return (
    <>
    <div>
      {count}
    </div>
    <div>
      <button onClick={handleCount}>Increment By One</button>
    </div>
    </>
  )
}

export default Home