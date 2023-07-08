import React from "react"
import Image from "next/image"

export default function Avatar(){
    return (
        <section id="avatar" className="w-1/3">
            <div className="text-center">
                <Image
                    className="mx-auto"
                    src="next.svg"
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