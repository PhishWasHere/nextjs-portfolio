'use client'
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Repos() {

    const [repos, setRepos] = useState<any[]>([]);

    useEffect(() => { // fetch repos from api
        // fetch('/api/repo') not using mongo for this since i dont want to pay $70 for a heroku mongo db
        fetch('https://api.github.com/users/PhishWasHere/repos?sort=updated&direction=desc&per_page=8')
        .then(response => {
            if(!response.ok) {
                throw response;
            }
            console.log(response);

            return response.json();
        })
        .then(data => {
            setRepos(data);
            console.log(data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <section id="repos" className="">
        <div className="text-center flex">
          <h3 className="bg-white text-3xl font-bold mb-4 mx-auto p-2 mt-3">My most recent repos</h3>
        </div>

        <div className="sm:grid grid-cols-2 gap-4 justify-center items-center">
          {repos.map((repo) => ( // map over repos and display them
            <div id="card" className="flex h-44 w-5/6 mx-auto bg-white mb-2" key={repo.id}>
            <div className="p-4 flex flex-grow">
              <div id="text" className="flex flex-col flex-grow justify-between">
                <div>
                  <h4 className="text-lg font-bold">{repo.name}</h4>
                  {!repo.description ? (
                    <p className="text-sm">No description provided.</p>
                  ) : (
                    <p className="text-sm">{repo.description}</p>
                  )}
                </div>
                <div className="mt-auto">
                  <a
                    className="bg-teal-500 text-black text-md p-1 px-2 hover:bg-zinc-950/90 hover:text-teal-500 transition hover:border-teal-500 border"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repository
                  </a>
                </div>
              </div>
          
              <div className="flex ml-auto">
                <div className="items-center w-36 h-36 ml-auto">
                  {!repo.image ? (
                    <Image
                      className="h-full w-full object-cover overflow-hidden rounded-lg"
                      src="/angry.jpg"
                      width={128}
                      height={128}
                      alt="placeholder"
                    />
                  ) : (
                    <Image
                      className="h-full w-full object-cover overflow-hidden rounded-lg"
                      src={repo.image}
                      width={128}
                      height={128}
                      alt={repo.alt}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>          
          ))}
        </div>
      </section>
    )
}
