import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Navitems from './Navitems';
import Mobilenav from './Mobilenav';



const Header = () => {
  return (
    
    <header className='flex' style={{justifyContent:"space-between"}}>
      <div>
        <Image src='/assets/images/logo.svg' alt='logo' width={128} height={30}/>
      </div>
      <div className=''>

   </div>
   <SignedIn>
    <nav>
      <Navitems/>
    </nav>
   </SignedIn>
   <SignedIn>
    <UserButton afterSignOutUrl='/' />
   </SignedIn>
   <SignedIn>
    <nav>
      {/* <Mobilenav/> */}
    </nav>
   </SignedIn>
   <SignedOut>
          <Button asChild className='rounded-full' size='lg'>
            <Link  href='/sign-in'>
            Login in
            </Link>
          </Button>
        </SignedOut>
        
    </header>
  
  )
}

export default Header