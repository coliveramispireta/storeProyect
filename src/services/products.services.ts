import { IProduct } from "@/types/types"

const apiURL = process.env.NEXT_PUBLIC_API_URL

export async function getProducts() {
    try { 
        const res = await fetch(`${apiURL}/products`, {
            method: 'GET',
            next: {revalidate: 3600}
        })
        const products = await res.json()
        if (res.ok) return products
        else throw new Error (products?.message);
    }
    catch (error: any){
        throw new Error (error)
    }
}

export async function getProductsById(id: string) {
    try { 
        
        const products = await getProducts();
        const product = products.find( (product: IProduct) => product.id.toString() === id);
        if (!product) throw new Error ("Product not found");
        return product;
    }
    catch (error: any){
        throw new Error (error)
    }
}