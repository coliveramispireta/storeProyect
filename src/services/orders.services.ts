import { ICreateOrderParams } from "@/types/types";


const apiURL = process.env.NEXT_PUBLIC_API_URL

export async function createOrder({ cart, token }: ICreateOrderParams): Promise<void> {
    try { 
        const res = await fetch(`${apiURL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
              },
              body: JSON.stringify({ products: cart?.map(product => product.id) }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al realizar la compra');
              }
            } catch (error: any) {
              throw new Error(error.message || 'Error al realizar la compra');
            }
          }
