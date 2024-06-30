import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='flex justify-center items-center flex-col sm:flex-row gap-5 text-center'>
      <Link href="/">
      <Image src="/assets/images/logo.svg" alt='logo' width={128} height={34}/>
      </Link>
      <p>
        2024 Bookingo  © All Rights reserved 
      </p>
      </div>

    </footer>
  )
}

export default Footer;