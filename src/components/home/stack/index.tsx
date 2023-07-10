import React from "react";
import { useState } from "react";

export default function Stack() {

  const[isActive, setIsAvtice] = useState(true)
  const handleClick = () => {
    setIsAvtice(isActive => !isActive)
  }

  const stack = [
      'js',
      'ts',
      'react',
      'NEXT',
      'node',
      'express',
      'MYSQL',
      'mongo',
      'CSS',
      'tailwind',
    ]

    return (
      <section id="stack" className={isActive ? 'flex flex-col max-w-lg mx-auto bg-white' : 'flex flex-col'}>
          <button className={isActive ? "mx-auto p-3 mt-2 transition bg-teal-500 hover:bg-zinc-950/90 hover:text-teal-500" : 'mx-auto p-3 mt-2 transition bg-white hover:bg-zinc-950/90 hover:text-teal-500'} onClick={handleClick}>
          <div  className="text-xl font-bold" >My Tech Stack</div>
          </button> 
          <div className={isActive ? 'flex flex-wrap justify-center py-2' : 'hidden'}>
            {stack.map((tech) => (
              <div className="p-2 text-center w-24" key={tech}>
                <div className="border-2 p-2 transition hover:bg-zinc-950/90 hover:text-teal-500">
                  <h4 className="text-sm">{tech}</h4>
                </div>
              </div>
            ))}
          </div>
      </section>
    )
}