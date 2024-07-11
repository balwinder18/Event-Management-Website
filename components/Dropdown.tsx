import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from '@/lib/database/models/categoryModel'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from './ui/input'
import { createCategory, getAllCategories } from '@/lib/actions/category.actions'
  
  
type DropdownProps = {
    value?: string,
    onChangeHandler?:()=> void
}
const Dropdown = ({value , onChangeHandler} : DropdownProps) => {
    
    const [categories , setCategories] = useState<ICategory[]>([])
    const [newCategory , setNewCategory ] = useState('');

    const handleAddCategory= () =>{
      createCategory({
        categoryName: newCategory.trim()
      })
      .then((category) =>{
        setCategories((prevState)=> [...prevState , category])
      })

    } 

     useEffect(() => {
        const getCategories = async  ()=>{
          const categoryList = await getAllCategories();

          categoryList && setCategories(categoryList);

        }

        getCategories();
     }, [])
     
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Category" />
    </SelectTrigger>
    <SelectContent>
     {categories.length > 0 && categories.map((category)=>(
           <SelectItem value={category._id} key={category._id}>
            {category.name}
           </SelectItem>
           
     ))
     }
     <AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>New title</AlertDialogTitle>
      <Input type='title' placeholder='Enter Title' onChange={(e)=> setNewCategory(e.target.value)}/>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>{
        startTransition(handleAddCategory)

      }}>Add</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </SelectContent>
  </Select>
  
  )
}

export default Dropdown