import React from 'react'

const TopHeaderImg = ({title}:{title:string}) => {
  return (
    <div className="h-72 relative overflow-hidden bg-[url('/headerImg.webp')] flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-black/10"></div>
        <h1 className="text-black capitalize text-6xl font-bold text-center">
          {title}
        </h1>
      </div>
  )
}

export default TopHeaderImg