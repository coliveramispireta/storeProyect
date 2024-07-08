import { ILoginProps, IOrder, IOrderParams, IRegisterProps, IUserSession } from "@/types/types";

const apiURL = process.env.NEXT_PUBLIC_API_URL

export async function loginUser(data: ILoginProps) {
    try { 
        const res = await fetch(`${apiURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data),
            });

        const user = await res.json()
        if (res.status === 200) return user;
        else throw new Error (user?.message);
                
    }
    catch (error: any){
        throw new Error (error)
    }
}

export async function registerUser(data: IRegisterProps) {
    try { 
        const res = await fetch(`${apiURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data),
            });
           const resData = await res.json();
        if (res.status === 201) return resData;
        else throw new Error (resData?.message);
    }
    catch (error: any){
        throw new Error (error)
    }
}


export async function getOrder(token: string | undefined){
     try { 
        const res = await fetch(`${apiURL}/users/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
              },
            });

        const orders: IOrder[] = await res.json()
        console.log("My orders", orders);
        return orders;
    }
    catch (error: any){
        throw new Error (error)
    }
}