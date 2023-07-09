'use client'
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Repos() {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch('/api/repo')
        .then(response => {
            if(!response.ok) {
                throw response;
            }
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
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">My most recent repos</h3>
        </div>
        <div className="sm:grid grid-cols-2 gap-4 justify-center items-center">
          {repos.map((repo) => (
            <div id="card" className="flex rounded-lg h-44 w-5/6 mx-auto bg-red-950 mb-2" key={repo._id}>
              <div className="bg-gray-700 rounded p-4">   
    
                <div id="text" className="flex flex-col flex-grow ml-4">
                  <div className="justify-between items-end"> 
                    <h4 className="text-lg font-bold">{repo.name}</h4>
                    {!repo.description ? (
                      <p className="text-sm">No description provided.</p>
                      ) : (
                        <p className="text-sm">{repo.description}</p>
                        )}
                    <a
                      className="text-blue-500 text-sm underline"
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      >
                      View Repository
                    </a>
                  </div>
                </div>
                
                {repo.primaryLanguage && (
                  <div className="text-center">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-1"
                      title={repo.primaryLanguage.name}
                    ></span>
                  </div>
                )}
              </div>

              <div className="flex ml-auto">
              <div className="items-center justify-center bg-stone-300">
                {!repo.image ? (
                  <Image
                    className="h-full w-full object-cover overflow-hidden rounded-full"
                    src="/angry.jpg"
                    width={128}
                    height={128}
                    alt="placeholder"
                  />
                ) : (
                  <Image
                    className="h-full w-full object-cover overflow-hidden rounded-full"
                    src={repo.image}
                    width={128}
                    height={128}
                    alt={repo.alt}
                  />
                )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    )
}