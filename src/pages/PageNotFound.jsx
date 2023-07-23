import React from 'react'
import { useNavigate } from 'react-router'

const PageNotFound = () => {
    const navigate = useNavigate()
    const notFoundStyle = {
        display: "flex",
        justifyContent:"center",
        alignItems:'center',
        flexDirection: 'column',
        height : "100vh",
        padding: '3rem'
    }

    const pStyle = {
        fontSize: 'var(--font-small)',
        textAlign: 'center'
    }

    const buttonStyle = {
        marginTop: '1.5rem',
        backgroundColor: 'var(--color-accent)',
        border: 'none',
        width: '100%',
        padding: '1rem',
        borderRadius: '5rem',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'center'

    }

  return (
    <div style={notFoundStyle}>
        <h1>404 Not Found</h1>
        <p style={pStyle}>Page's under construction or doesn't exist at all</p>
        <button onClick={() => navigate(-1)} style={buttonStyle}>Back to Previous Page</button>
    </div>
  )
}

export default PageNotFound