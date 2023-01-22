import React from 'react'

const index = ({ defaultValue, children, ...rest }) => {
  return (
    <div>
      <select {...rest} defaultValue={defaultValue} className='duration-150 py-2 dark:bg-darkHover border dark-lightBorder dark:border-darkBorder rounded-lg p-2 w-full text-lightText dark:text-darkText focus:outline-none cursor-pointer disabled:cursor-not-allowed'>
        {children}
      </select>
    </div>
  )
}

export default index