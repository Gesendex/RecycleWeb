import React, {useState} from 'react';

const Counter = () => {

    const [count, setCounter] = useState(0)

    function increment() {
        setCounter(count + 1)
    }

    function decrement() {
        setCounter(count - 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Увеличить</button>
            <button onClick={decrement}>Уменьшить</button>
        </div>
    );
};

export default Counter;