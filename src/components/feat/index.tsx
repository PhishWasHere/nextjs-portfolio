import React from "react";

export default function Feat() {

    const featRepo = [
        {
            "id": 1,
            "url": '/nextjs',
            "name": "nextjs-portfolio",
            "description": "My first attempt at Next.js, TypeScript, and TailwindCSS.",
        },
        {
            "id": 2,
            "url": '/bookreview',
            "name": "Book Review App",
            "description": "A full-stack group project built with Node.js, Express.js, MySQL, and Handlebars.js.",
        }
    ]

    return (
        <section id="featured" className="">
        <div className="text-center p-4">
          <h3 className="text-3xl font-bold">Featured Repositories</h3>
        </div>
        <div className="sm:grid grid-cols-2 gap-4 justify-center items-center mx-2">
          {featRepo.map((repo) => (
            <div className="p-4" key={repo.id}>
              <div className="bg-gray-200 rounded p-4 h-36">
                <h4 className="text-lg font-bold">{repo.name}</h4>
                <p className="text-sm">{repo.description}</p>
                <a
                  className="text-blue-500 text-sm underline"
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    
    
    )
}
   
    
    
    
    
    
    