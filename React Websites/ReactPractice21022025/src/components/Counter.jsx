import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const Counter = () => {

    const [count , setCount] = useState(0);

    const num = useRef(0);

    const elementRef = useRef(null);

    const [val , setVal] = useState(0);

    useEffect(() => {
        if(num.current % 2 == 0){
            elementRef.current.style.backgroundColor = "red";
        }else{
            elementRef.current.style.backgroundColor = "green";
        }
    });

    let doubleNumber = useCallback((number) => {
        for(let i = 0; i<=100000000 ; i++){

        }

        return 2 * number;
    } , [])

    let doubleNum = useMemo(() => {
        return doubleNumber(val);
    } , [val]);

    return (
        <div>
            <div>{count}</div>
            <div ref={elementRef}>{num.current}</div>
            <button onClick={() => {
                doubleNumber(1);
                setCount(count + 1);
                num.current = num.current + 1;
            }}>Increment by 1</button>
        </div>

    )
}

export default Counter