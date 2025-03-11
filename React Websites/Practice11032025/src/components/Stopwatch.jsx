import React, { useEffect, useRef, useState } from 'react'

const Stopwatch = () => {
    let intervalRef = useRef(null);
    const [seconds , setSeconds] = useState(0);


    function handleStart(){
        intervalRef.current = setInterval(() => {
            setSeconds((previousSeconds) => {
                return previousSeconds + 1;
            } , 1000);
        });
    }
  return (
    <>
        <div>
            {seconds}
        </div>

        <div>
            <button onClick={handleStart}>
                Start
            </button>
        </div>
    </>
  )
}

export default Stopwatch