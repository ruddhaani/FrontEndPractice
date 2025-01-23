import React, { useEffect } from "react";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [secondCount, setSecondCount] = useState(0);


  //every render
  useEffect(()=>{
    console.log(count);
  })

  //everytime count changes
  // useEffect(() => {
  //   console.log("The value of count is " + count);
  // }, [count]);

  //if we give empty array only first render it will work
  // useEffect(()=>{
  //   console.log("The value of count is " + count);
  // } , [])

  return (
    <>
      <div>Counter Value is {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment by 1
      </button>

        <div>Counter value 2 is {secondCount}</div>
      <button
        onClick={() => {
          setSecondCount(secondCount + 1);
        }}
      >
        Increment secondCount by 1
      </button>
    </>
  );
};

export default Counter;
