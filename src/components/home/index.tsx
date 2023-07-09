import Avatar from './avatar'
import Stack from './stack'
import Feat from './feat'
import Repos from './repos'

export default function Home() {
    return (
        <>
        <div className="lg:flex min-h-screen justify-center">
          <aside className='px-3 py-1 border lg:max-w-lg '>
            <div className='md:min-w-full'>
              <Avatar />
              <Stack />
            </div>
          </aside>
          
          <main className='container w-full border max-w-7xl'>
            <Feat />
            <Repos />
          </main>
        </div>
        
        </>
      )
}
    