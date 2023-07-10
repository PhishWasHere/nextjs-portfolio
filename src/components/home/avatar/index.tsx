import React from "react"
import Image from "next/image"

export default function Avatar(){
    return (
        <section id="avatar" className="flex justify-center">
            <div className="mx-auto text-center bg-white p-3">
                <Image
                    className="mx-auto rounded-3xl object-scale-down"
                    src="/angry.jpg"
                    width={0}
                    height={0}
                    sizes="vw"
                    style={{ width: '75%', height: 'auto' }}
                    alt="placeholder"
                />
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold hover:text-teal-500 shadow-zinc-800/5 ">name name name</h3>
                    <p className="hover:text-teal-500 shadow-zinc-800/5 ">No description provided.</p>
            </div>
            </div>
        </section>
    )
}