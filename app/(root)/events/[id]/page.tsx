import Header from '@/components/Header'

import React from 'react'
import { SearchParamProps } from '@/types';
import { getEvent } from '@/lib/actions/event.actions';
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';

const Eventdetails = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEvent(id);
  

  return (
    <>
      

      <section className='flex justify-center flex-col bg-primary-50 bg-dotted-pattern bg-contain'>
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
          <Image src={event.iamgeUrl} alt='event image' width={1000} height={100} className='h-full min-h-[300px] object-cover object-center' />
          <div className='flex w-full flex-col p-5 gap-8 md:p-10'>
            <div className='flex flex-col gap-6 sm:items-center'>
              <h2 className='h2-bold'>{event.title}</h2>
              <div className='flex flex-col md:flex-row gap-3 sm:items-center'>
                <div className='flex gap-3'>
                  <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>{ event.isFree ?'FREE' : `$${event.price}`}</p>
                  <p className='p-medium-16 rounded-full  bg-grey-500/10 px-4 py-2.5 text-grey-500 '>
                    {event.category.name}
                  </p>
                </div>
                <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                  by{' '}
                  <span className='text-primary-500'>{event.organiser.username}</span>
                </p>
              </div>
            </div>

            {/* checkout button */}

            <div className='flex flex-col gap-5'>
              <div className='flex gap-2 md:gap-3'>
                <Image src='/assets/icons/calendar.svg' alt='calendar' width={32} height={32} />
                <div>
                  <p>
                     {formatDateTime(event.startDateTime).dateOnly} -
                     {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                     {formatDateTime(event.endDateTime).dateOnly} - 
                     {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className='p-regular-20 flex gap-3 items-center'>
                <Image src='/assets/icons/location.svg' alt='location' width={32} height={32}/>
                <p className='p-medium-16 lg:p-regular-20'>{event.location}</p>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='p-bold-20 text-gray-600'>Insights of the event</p>
              <p className='p-medium-16 lg:p-regular-20'>{event.description}</p>
              <p className='p-medium-16 lg:p-regular-20 truncate underline text-primary-500'>{event.url}</p>
            </div>

          </div>
        </div>


      </section>
    </>

  )
}

export default Eventdetails