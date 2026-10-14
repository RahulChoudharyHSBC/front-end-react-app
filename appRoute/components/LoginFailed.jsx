import React from 'react'

export default function LoginFailed() {
    return (
        <>
            <h2>
            <span style={{ color: 'red', fontSize: '2rem' }}>⚠</span> Login Failed
            </h2>
            <p>Invalid username or password.</p>
        </>
    )
}