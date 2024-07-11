import Collection from '@/components/Collection';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'

const ProfilePage = async () => {
    const {sessionClaims} = auth();

    const  userId = await sessionClaims?.userId as string;
    
    const organizedEvents = await getEventsByUser({userId , page:1 , limit:6}); 
    

  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
            <h3 className='h3-bold text-center sm:text-left'> My Tickets</h3>
            <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
    </section>
     {/* <section className='wrapper my-8'>
     <Collection 
            data={events?.data}
            emptyTitle="No events tickets purchased"
            emptySubText="explore events"
            collectionType="My_Tickets"
            limit={3}
            page={1}
            urlParamName="ordersPage"
            totalPages={2}
           />
     </section> */}

<section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
            <h3 className='h3-bold text-center sm:text-left'>My Events</h3>
            <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create Events
            </Link>
          </Button>
        </div>
    </section>

    <section className='wrapper my-8'>
     <Collection 
            data={organizedEvents?.data}
            emptyTitle="No events created"
            emptySubText="create events"
            collectionType="Event_Organised"
            limit={3}
            page={1}
            urlParamName="ordersPage"
            totalPages={2}
           />
     </section>


    </>
  )
}

export default ProfilePage;