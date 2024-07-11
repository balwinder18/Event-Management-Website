'use client'

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventDefaultValues } from '@/constants'
import Dropdown from './Dropdown'
import { Textarea } from './ui/textarea'
import { Fileuploader } from './Fileuploader'
import Image from 'next/image'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from './ui/checkbox'
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { createEvent, updateEvent } from '@/lib/actions/event.actions'
import { IEvent } from '@/lib/database/models/eventModels'


const formSchema = z.object({
  title: z.string().min(2, { message: "username must be at least 2 characters.", }).max(20, { message: "limit exceeded" }),
  description: z.string().min(2, { message: "description must be at least 2 characters.", }).max(400, { message: "limit exceeded" }),
  location: z.string().min(2, { message: "location must be at least 2 characters.", }).max(400, { message: "limit exceeded" }),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url()
})

type EventFormProps = {
  userId: string
  type: "create" | "update" 
  event?:IEvent,
  eventId?: string
}
const Eventform = ({ userId,type,event , eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const {startUpload} = useUploadThing('imageUploader');
  const Router = useRouter();
  const initalValues = event && type==='update'? {
    ...event,
    startDateTime : new Date(event.startDateTime),
    endDateTime:new Date(event.endDateTime)

  }: eventDefaultValues;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initalValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let uploadedImageUrl = values.imageUrl; 

    if(files.length>0){
      const uploadedImages = await startUpload(files);

      if(!uploadedImages){
        return
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if(type == "create"){
      try {

        const newEvent = await createEvent({
          event : { ...values , iamgeUrl:uploadedImageUrl },
          userId,
          path:'/profile'
        });

              if(newEvent){
                form.reset();
                Router.push(`/events/${newEvent._id}`)
              }
        
      } catch (error) {
        console.log(error);
      }
    }

    if(type == "update"){
      if(!eventId){
        Router.back();
        return;
      }
      try {

        const updatedevent = await updateEvent({
         
          userId,
          event : { ...values , iamgeUrl:uploadedImageUrl , _id: eventId },
          path:`/events/${eventId}`
        });

              if(updatedevent){
                form.reset();
                Router.push(`/events/${updatedevent._id}`)
              }
        
      } catch (error) {
        console.log(error)
      }
    }


  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className='w-full'>

                <FormControl>
                  <Input placeholder="Event Title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className='w-full'>

                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className='w-full'>

                <FormControl >
                  <Textarea placeholder="Description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className='w-full'>

              <FormControl >
                <Fileuploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className='w-full'>

                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>

                    <Image src="/assets/icons/location-grey.svg" alt='calendar' width={24} height={24} />
                    <Input placeholder="Event Location" {...field} />
                  </div>


                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

        </div>


        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className='w-full'>

                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>

                    <Image src="/assets/icons/calendar.svg" alt='calendar' width={24} height={24} className='filter-grey'/>
                    <p className='ml-3 whitespace-nowrap text-grey-600 '>
                      Start Date:
                    </p>
                    <DatePicker selected={field.value} onChange={(date:Date) => field.onChange(date)}  showTimeSelect timeInputLabel='Time:' dateFormat="dd/MM/yyyy h:mm aa " wrapperClassName='datePicker'/>
                  </div>


                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

        </div>


        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className='w-full'>

                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>

                    <Image src="/assets/icons/calendar.svg" alt='calendar' width={24} height={24} className='filter-grey'/>
                    <p className='ml-3 whitespace-nowrap text-grey-600 '>
                      End Date:
                    </p>
                    <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)}   showTimeSelect timeInputLabel='Time:' dateFormat="dd/MM/yyyy h:mm aa " wrapperClassName='datePicker'/>
                  </div>


                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

        </div> 
         

         <div className='flex flex-col gap-5'>

         <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className='w-full'>

                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>

                    <Image src="/assets/icons/dollar.svg" alt='dollar' width={24} height={24} className='filter-grey'/>
                   <Input type='price' placeholder='Price' {...field}/>
                   <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem >

                <FormControl>
                  <div className='flex items-center'>
            <label htmlFor='isFree' className='whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Free Ticket</label>
                    
                   <Checkbox onCheckedChange={field.onChange} checked={field.value} id="isFree" className='mr-2 h-5 w-5 border-2 border-primary-500'/>
                    </div>


                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
                  </div>


                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className='w-full'>

                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>

                    <Image src="/assets/icons/link.svg" alt='url' width={24} height={24} />
                    <Input placeholder="Url" {...field} />
                  </div>


                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

         </div>

        <Button 
        type="submit"
         size="lg"
         disabled={form.formState.isSubmitting}
         className=''

        >{form.formState.isSubmitting ? ("submitting... ") : `${type} Event `}</Button>
      </form>
    </Form>

  )
}

export default Eventform