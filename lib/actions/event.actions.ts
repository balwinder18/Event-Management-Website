'use server'

import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, UpdateEventParams } from "@/types"
import { handleError } from "../utils"
import { connecttodatabase } from "../database"
import User from "../database/models/userModels"
import Event from "../database/models/eventModels"
import Category from "../database/models/categoryModel"
import { revalidatePath } from "next/cache"

const populateevent = (query : any )=>{
    return query
     .populate({path : 'organiser' , model:User , select: '_id username'})
     .populate({path:'category' , model:Category , select:'_id name' }) 
}

export const createEvent= async ({event, userId , path  } : CreateEventParams) =>{
          try {
             await connecttodatabase();

             const organiser = await User.findById(userId);

             if(!organiser){
              throw new Error("organizer not found");

             }

             const newEvent = await Event.create({
                ...event , category:event.categoryId , organiser:userId
             }) 

             return JSON.parse(JSON.stringify(newEvent));
          } catch (error) {
             handleError(error);
          }
}


export const getEvent = async (eventId : string) =>{
     try {

      await connecttodatabase();

      const event = await populateevent(Event.findById(eventId));

      if(!event){
         throw new Error("event not found");
      }
      return JSON.parse(JSON.stringify(event));
     } catch (error) {
      handleError(error);
     }
}

export const getAllEvent = async ({query , limit=6 , page,category}: GetAllEventsParams) =>{
   try {

    await connecttodatabase();

    const conditions = {};

    const eventQuery = Event.find(conditions)
    .sort({createdAt:'desc'})
    .skip(0)
    .limit(limit)
    const event = await populateevent(eventQuery);
    const countevent = await Event.countDocuments(conditions);

    return {
      data:JSON.parse(JSON.stringify(event)),
      totalPages:Math.ceil(countevent/limit)
    }
   } catch (error) {
    handleError(error);
   }
}


export const deleteEvent = async ({eventId,path} : DeleteEventParams) =>{
   try {

    await connecttodatabase();

    const deleteevent = await Event.findByIdAndDelete(eventId);

    if(deleteevent){
       revalidatePath(path);
    }
    
   } catch (error) {
    handleError(error);
   }
}

export async function updateEvent({ userId, event, path }: UpdateEventParams) {
   try {
     await connecttodatabase()
 
     const eventToUpdate = await Event.findById(event._id)
     if (!eventToUpdate || eventToUpdate.organiser.toHexString() !== userId) {
       throw new Error('Unauthorized or event not found')
     }
 
     const updatedEvent = await Event.findByIdAndUpdate(
       event._id,
       { ...event, category: event.categoryId },
       { new: true }
     )
     revalidatePath(path)
 
     return JSON.parse(JSON.stringify(updatedEvent))
   } catch (error) {
     handleError(error)
   }
 }



 export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
   try {
     await connecttodatabase()
 
     const conditions = { organiser: userId }
     const skipAmount = (page - 1) * limit
 
     const eventsQuery = Event.find(conditions)
       .sort({ createdAt: 'desc' })
       .skip(skipAmount)
       .limit(limit)
 
     const events = await populateevent(eventsQuery)
     const eventsCount = await Event.countDocuments(conditions)
 
     return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
   } catch (error) {
     handleError(error)
   }
 }
 