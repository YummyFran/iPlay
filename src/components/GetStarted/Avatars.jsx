import React from 'react'

const Avatars = ({el, i}) => {
  return (
    <>
        <input type="radio" name='dp' id={`dp_${i}`}/>
        <label htmlFor={`dp_${i}`} className='avatarlabel'>
            <img src={el} alt={`dp_${i}`}/>
        </label>
    </>
  )
}

export default Avatars