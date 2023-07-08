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
        <section id="repos" className="w-2/3">
        <div className="text-center">
          <h3 className="text-3xl font-bold">My most recent repos</h3>
        </div>
        <div className="flex flex-wrap justify-center">
          {repos.map((repo) => (
            <div className="p-4" key={repo._id}>
              <div className="bg-gray-200 rounded p-4">
                {!repo.image ? (
                  <Image
                    className="mx-auto"
                    src="next.svg"
                    width={128}
                    height={128}
                    alt="placeholder"
                  />
                ) : (
                  <Image
                    className="mx-auto"
                    src={repo.image}
                    width={128}
                    height={128}
                    alt={repo.alt}
                  />
                )}
    
                <div className="text-center">
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
    
                {repo.primaryLanguage && (
                  <div className="text-center">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-1"
                      title={repo.primaryLanguage.name}
                    ></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}