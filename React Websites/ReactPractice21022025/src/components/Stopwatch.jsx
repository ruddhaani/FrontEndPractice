import React, { useRef, useState } from 'react'

const Stopwatch = () => {
    const [seconds , setSeconds] = useState(0);
    let intervalRef = useRef(null);

    function handleStart(){
        intervalRef.current = setInterval(() => {
            setSeconds((previousSeconds) => {
                return previousSeconds + 1;
            } , 1000);
        });
    }

    function handleReset(){
        setSeconds(0);
    }

    function handleStop(){
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
    
  return (
    <div>
        <h1>Stopwatch</h1>

        <h2>{seconds}</h2>

        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Stopwatch