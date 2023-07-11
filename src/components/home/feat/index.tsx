import React from "react";

export default function Feat() {

    const featRepo = [
        {
            "id": 1,
            "url": 'https://github.com/PhishWasHere/nextjs-portfolio',
            "name": "nextjs-portfolio",
            "description": "My first attempt at Next.js, TypeScript, and TailwindCSS.",
        },
        {
            "id": 2,
            "url": 'https://github.com/TamaraDawg/BookReviewApp',
            "name": "Book Review App",
            "description": "A full-stack group project built with Node.js, Express.js, MySQL, and Handlebars.js.",
        }
    ]

    return (
        <section id="featured" className="">
        <div className="text-center flex">
          <h3 className="bg-white text-3xl font-bold mb- mx-auto p-2 mt-4">Featured Projects</h3>
        </div>
        <div className="sm:grid grid-cols-2 gap-4 justify-center items-center mx-2">
          {featRepo.map((repo) => (
            <div className="p-4 grid grid-cols-1l" key={repo.id}>
              <div className="bg-white p-4 h-36 flex flex-col">
                <div>
                  <h4 className="text-lg font-bold">{repo.name}</h4>
                  <p className="text-sm">{repo.description}</p>
                </div>

                <div className="self-start mt-auto">
                  <a
                    className=" bg-teal-500 text-black text-md p-1 px-2 hover:bg-zinc-950/90 hover:text-teal-500 transition hover:border-teal-500 border"
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    
    
    )
}
   
    
    
    
    
    
    