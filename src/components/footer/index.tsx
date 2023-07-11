
import Link from 'next/link';
import Image from 'next/image';
 
export default function Footer() {

    const socials = [
        { name: 'Twitter', href: 'https://twitter.com/', icon: '/twitter.svg', key: '1' },
        { name: 'GitHub', href: 'https://github.com/PhishWasHere', icon: '/github.svg', key: '2' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/miran-yasunori-880207265/', icon: '/linkedin.svg', key: '3' },
        // {name: 'Threads', href: 'https://threads.com/', icon: '/threads.svg', key: '4'} not a web app apparently
    ]

    return (
        <footer className='static bottom-0 flex'>
            <div className='flex felx-col bg-white mx-auto my-3 py-2'>
            {socials.map((social) => (
                <Link key={social.key} href={social.href} className='p-3 border-4 mx-3 border-black transition rounded-xl hover:border-4 hover:border-teal-500'>
                    <Image
                        src={social.icon}
                        alt={social.name}
                        width={17}
                        height={17}
                        />
                </Link>
            ))}
            </div>
        </footer>
    )
}