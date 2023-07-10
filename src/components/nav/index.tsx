'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function NavBar() {
  
    const navLinks = [ //array of nav links
        { href: '/', label: 'Home',}, 
        { href: '/about', label: 'About Me',},
        { href: '/contact', label: 'Contact',},
        { href: '/resume', label: 'Resume',},
    ]; 

    const pathname = usePathname();
    
    return (
        <>
         <nav className='flex justify-center'>
            <div className="pointer-events-auto my-3 block">
                <ul className="flex rounded-full px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur bg-zinc-800/90 text-zinc-200 ring-white/10">
                    {navLinks.map((link) => { //map through the array of nav links
                        const isActive = pathname === link.href; //if the path is the same as the link, then it is active
                        return (
                            <li key={link.label}>
                                <Link href={link.href}

                                    className={
                                        isActive ? //if the path is the same as the link, then if is true
                                        'relative block px-3 py-2 transition text-teal-500 dark:text-teal-400' 
                                        :
                                        'relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400'
                                    }>

                                    {link.label}                                    
                                </Link>
                            </li>                       
                        ) 
                    })} 
                </ul>
            </div>
        </nav>
        </>
    );
}
 