import Eventform from "@/components/Eventform"

import { getEvent } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs/server"


type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvents = async ({params: { id } }: UpdateEventProps) => {
  const {sessionClaims} = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEvent(id)
  return (
    <>
   <section className='bg-blue-10 bg-cover bg-center py-5 md:py-10 text-center'>
      <div className='font-bold '>Update Events</div>
   </section>
      <div className='my-8'>
         <Eventform type="update" 
          event={event} 
          eventId={event._id} 
          userId={userId} />
      </div>

   </>
  )
}

export default UpdateEvents