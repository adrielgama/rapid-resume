import React from 'react'

function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-dark-blue">
      <div className="flex flex-row gap-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-light-blue"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-light-blue [animation-delay:-.3s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-light-blue [animation-delay:-.5s]"></div>
      </div>
    </div>
  )
}

export default Loader
