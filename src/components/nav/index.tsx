'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function NavBar() {
  
    const navLinks = [ //array of nav links
        { href: '/', label: 'Home',}, 
        { href: '/about', label: 'About Me',},
        { href: '/contact', label: 'Contact',},
        { href: '*', label: 'Resume',},
    ]; 

    const pathname = usePathname();
    
    return (
         <nav className='flex justify-center'>
            <div className="pointer-events-auto my-3 block">
                <ul className="flex px-3 text-sm font-medium shadow-lg ">
                    {navLinks.map((link) => { //map through the array of nav links
                        const isActive = pathname === link.href; //if the path is the same as the link, then it is active
                        return (
                            <li key={link.label}>
                                <Link href={link.href}

                                    className={
                                        isActive ? //if the path is the same as the link, then if is true
                                        'relative block px-3 py-2 transition text-teal-500 bg-zinc-950/90 border border-teal-500 hover:bg-zinc-950/90 hover:text-teal-500' 
                                        :
                                        'relative block . px-3 py-2 transition bg-white hover:text-teal-500 hover:bg-zinc-950/90 border hover:border-teal-500'
                                    }>

                                    {link.label}                                    
                                </Link>
                            </li>                       
                        ) 
                    })} 
                </ul>
            </div>
        </nav>
    );
}
 