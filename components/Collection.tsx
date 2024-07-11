import { IEvent } from '@/lib/database/models/eventModels'
import React from 'react'
import Card from './Card'

type collectionProps = {
  data:IEvent[],
  emptySubText:String,
  emptyTitle:String,
  limit:number,
  page:number | String,
  totalPages?:number,
  collectionType?: `Event_Organised` | `My_Tickets` | `All_Events`,
  urlParamName?:String
}

const Collection = ({data,emptySubText,emptyTitle,page,totalPages=0,collectionType,urlParamName} : collectionProps) => {
  
  return (
  <>
     {data.length > 0 ? (
      <div className=' flex flex-col gap-5 items-center'> 
      <ul className='grid grid-cols-1 w-full gap-5 sm:grid-cols-2  lg:grid-cols-3 xl:gap-10'>
          {data.map((event)=>{
            const hasOrderLink = collectionType==='Event_Organised';
            const hideprice = collectionType==='My_Tickets';

            return(
              <li key={event._id} className='flex justify-center'>
                <Card event={event} hasOrderLink={hasOrderLink} hideprice={hideprice}/>
              </li>
            )

          })}
      </ul>
      </div>
     ) : (
      <div className='flex-center wrapper min-h-[300px] w-full rounded-[14px] flex-col gap-3 bg-grey-50 py-28 text-center'>
        <h1 className='p-bold-20 md:h5-bold'>{emptyTitle}</h1>
        <p className='p-regular-14'>{emptySubText}</p>
      </div>
     )}
  </>
  )
}

export default Collection