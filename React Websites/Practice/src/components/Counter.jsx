import React from 'react'
import { useState } from 'react'

const Counter = () => {

    const [count , setCount] = useState(0);

  return (
    <>
    <div>Counter Value is {count}</div>
    <button onClick={() => {
        setCount(count + 1);
    }}>Increment by 1</button>
    </>
  )
}

export default Counter