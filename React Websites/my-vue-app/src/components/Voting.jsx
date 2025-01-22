import React, { useState } from 'react'

export const Voting = () => {

    const [age , setAge] = useState(66);

return(
    <div>
        {/* {age >= 18 ? "You can vote" : "You can't vote!"} */}

        {/* logical operator */}
        {(age >= 18) && "You can vote" }

        
    </div>
);
}
