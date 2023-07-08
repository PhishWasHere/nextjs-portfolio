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
        <section id="stack" className="w-1/3">
        <div className="text-center">
          <h3 className="text-xl font-bold">My Tech Stack</h3>
          <div className="flex flex-wrap justify-center">
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