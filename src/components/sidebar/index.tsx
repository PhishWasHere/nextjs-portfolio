import Link from 'next/link';

export default function Sidebar({ searchParams }: {searchParams: {[key: string]: string | string[] | undefined}} ) {
    const locationParam = (searchParams.location || 'home') as string;
    return (
        <>
            <Link className='m-1 mt-auto' href={`?${new URLSearchParams({...searchParams, location: 'home'})}`}>
            asd
            </Link>
        </>
    )
}