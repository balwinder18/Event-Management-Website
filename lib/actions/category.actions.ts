'use server' 
 
import { CreateCategoryParams } from "@/types"
import { connecttodatabase } from "../database"
import { handleError } from "../utils";
import Category from "../database/models/categoryModel";

export const createCategory = async ({ categoryName } : CreateCategoryParams) =>{
    try {
        await connecttodatabase();

        const newCategory = await Category.create({name  : categoryName});

        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error);
    }

}

export const getAllCategories = async () =>{
    try {
        await connecttodatabase();

        const categories = await Category.find();

        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        handleError(error);
    }

}