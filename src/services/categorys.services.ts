import { categoriesToPreLoad } from "@/helpers/categorysToPreLoad";

export async function getCategorys() {
    try {      
        const categorys = categoriesToPreLoad;
        if (!categorys) throw new Error ("category not found");
        return categorys;
    }
    catch (error: any){
        throw new Error (error)
    }
}