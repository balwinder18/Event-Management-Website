import { headerLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'

const Navitems = () => {
  return (
    <ul className='gap-5 flex '>
      {headerLinks.map((link)=>{
        return(
          <li style={{marginRight: '22px'}}>
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}

    </ul>
  )
}

export default Navitems