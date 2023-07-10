'use client'

import Image from 'next/image'

export default function About () {
    return (
      <article className='mx-auto max-w-2xl lg:max-w-5xl mt-8'>
        <div className='grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-y-12'>
          <div className='lg:pl-20'>
            <section className='max-w-xs px-2.5 lg:max-w-none mx-auto'>
              <Image
                src='/angry.jpg'
                alt='Picture of the author'
                width={400}
                height={400}
                className='rounded-full'
                />
            </section>
          </div>
      
          <div className="lg:order-first lg:row-span-2">
            <h2 className="text-4xl font-bold tracking-tight bg-white p-2 hover:text-teal-500 hover:bg-zinc-950/90 hover:border">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo ut tellus
              pulvinar consequat.
           </h2>

            <p className="mt-3 space-y-7 text-base bg-white p-2 hover:text-teal-500 hover:bg-zinc-950/90 hover:border">
              Integer semper cursus diam, id consectetur mi eleifend ut. Phasellus at tristique nibh.
              Suspendisse potenti. Donec volutpat, dolor sed maximus aliquet, lectus nulla congue
              ipsum, eu cursus tortor lorem non sem. 
            </p>
             <p className="mt-3 space-y-7 text-base bg-white p-2 hover:text-teal-500 hover:bg-zinc-950/90 hover:border">
                Fusce semper consectetur elit, id auctor sem rhoncus at. Nullam mollis lectus eget
                mauris lacinia, ac mattis quam iaculis. Mauris tincidunt, felis a efficitur aliquam,
                nisi nisl finibus ipsum, nec gravida turpis massa vel ex.
              </p>
            </div>
          </div>
        </article>
      );
}