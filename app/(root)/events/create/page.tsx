import React from 'react'
import Eventform from '../../../../components/Eventform'
import { auth } from '@clerk/nextjs/server';


const CreateEvents = () => {
  const {sessionClaims} = auth();

  const userId = sessionClaims?.userId ;
  return (
    <>
    
   <section className='bg-blue-900 bg-cover bg-center py-5 md:py-10 text-center'>
      <div className='font-bold '>Create Events</div>
   </section>
      <div className='my-8'>
         <Eventform userId={userId} type="create"/>
      </div>

   </>
  )
}

export default CreateEvents