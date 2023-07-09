import React from "react"
import Image from "next/image"

export default function Avatar(){
    return (
        <section id="avatar" className="flex justify-center  rounded-md hover:bg-gray-200 cursor-pointer p-2 text-gray-700 hover:text-blue-400">
            <div className="m-5 p-5 text-center">
                <Image
                    className="mx-auto rounded-lg"
                    src="/angry.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    alt="placeholder"
                    />
                <h3 className="text-xl font-bold">name name name</h3>
                <p className="">No description provided.</p>
            </div>
        </section>
    )
}