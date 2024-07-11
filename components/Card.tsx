import { IEvent } from '@/lib/database/models/eventModels'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './Deleteconfirmation'

type cardProps={
    event:IEvent,
    hasOrderLink?: boolean,
    hideprice?:boolean
}
const Card = ({event ,hasOrderLink , hideprice}: cardProps) => {

  const { sessionClaims } = auth();
console.log(event);
  const userId = sessionClaims?.userId as string;

  const isCreator = userId === event.organiser._id; 
  
  return (
    <div className='group relative flex min-h-[300px]  w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-[430px]:'>
      <Link 
      href={`/events/${event._id}`} 
      style={{backgroundImage:`url(${event.iamgeUrl})`}}
      className='flex-center flex-grow bg-gray-50 bg-center bg-cover text-gray-500' 
      />

      {isCreator && !hideprice &&
         <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
          <Link href={`/events/${event._id}/update`}>
           <Image src='/assets/icons/edit.svg' alt='edit' width={20} height={20}/>
          </Link>
          <DeleteConfirmation eventId={event._id}/>
         </div>
      }

<div className='flex min-h-[150px] flex-col gap-3 p-5 md:gap-4'>
       {!hideprice && 
           <div className='flex gap-2'>
           <span className='p-semibold-14 w-min rounded-full bg-green-50 px-4 py-1 text-green-16'>
             {event.isFree ? 'Free' : `$${event.price}`}
           </span>
   
           <p className='p-semibold-14 w-min rounded-full bg-grey-500 px-4 py-1 text-grey-50'>
             {event.category.name}
           </p>
         </div>
       } 

        <p className='p-medium-16 text-grey-500 md:p-medium-18 '>
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <Link href={`/events/${event._id}`}>
        <p className='p-medium-16 md:p-mediun-18 text-black line-clamp-2 flex-1'>{event.title}</p>
        </Link>
        <div className='flex-between w-full'>
          <p className='p-medium-14 md:p-medium-16'>
            {event.organiser.username}
          </p>
              {hasOrderLink && 
                 <Link href={`/orders?/eventId=${event._id}`} className='flex gap-2'>
                  <p className='text-primary-500'>Order Details</p>
                  <Image src='/assets/icons/arrow.svg' alt='search' width={10} height={10} />
                 </Link>
                }
        </div>
      </div>

      


    </div>
  )
}

export default Card