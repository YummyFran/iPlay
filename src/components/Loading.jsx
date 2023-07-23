import React from 'react'

const Loading = () => {
    const loadingStyle = {
        display: "flex",
        justifyContent:"center",
        alignItems:'center',
        flexDirection: 'column',
        height : "100vh",
    }

    const pStyle = {
        fontSize: 'var(--font-small)'
    }
  return (
    <div className='loading' style={loadingStyle}>
        <h1>iLoading</h1>
        <p style={pStyle}>Please wait a moment...</p>
    </div>
  )
}

export default Loading