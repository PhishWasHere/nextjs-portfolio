import React from "react";

export default function Stack() {

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
        <section id="stack" className="flex justify-center my-1 p-2 ">
        <div className="text-center">
          <h3 className="text-xl mt-2 font-bold">My Tech Stack</h3>
          <div className="flex flex-wrap justify-center p-5">
            {stack.map((tech) => (
              <div className="p-2" key={tech}>
                <div className="bg-gray-200 rounded p-2">
                  <h4 className="text-sm">{tech}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}