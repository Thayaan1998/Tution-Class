import React, { useState } from "react";

const Man = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name+" "+age);
      }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br></br>
                <label>Enter your age:
                    <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
        </div>
    );

}

export default Man;