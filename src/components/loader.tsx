import React from 'react'

function Loader() {
  return (
    <div className="dark:bg-dark-blue flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-row gap-2">
        <div className="bg-light-blue h-4 w-4 animate-bounce rounded-full"></div>
        <div className="bg-light-blue h-4 w-4 animate-bounce rounded-full [animation-delay:-.3s]"></div>
        <div className="bg-light-blue h-4 w-4 animate-bounce rounded-full [animation-delay:-.5s]"></div>
      </div>
    </div>
  )
}

export default Loader
