import React, { useState } from 'react'

const Counter = () => {

    const [count , setCount] = useState(0);

  return (
    <>
        <p>{count}</p>
        <button onClick={ () => {
            setCount(count+1);
        } }>Increase count by 1</button>
    </>
  )
}

export default Counter