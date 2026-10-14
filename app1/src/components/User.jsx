import React, { useState } from 'react';

export default function User() {
    const [name,setName] = useState("user123");
    const [mail,setMail] = useState("user@myemail.com");
  return (
    <div>
        <form>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
            </label>
        </form>

        <h2>User Details</h2>
            Name: {name}<br/>
            Email: {mail}<br/>
    </div>
  );
}