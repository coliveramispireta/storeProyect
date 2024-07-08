import Detail from "@/components/Detail/Detail";
import { getProductsById } from "@/services/products.services";

const page = async ( {params} : {params:{productID:string}} ) => {
   const productDetail = await getProductsById(params.productID);
    
    const { id, name, price, description, image, stock } = productDetail
    return (
      <>
      <Detail  id={id} name={name} price={price} description={description} image={image} stock={stock} />
      </>
     
    );
  };
  
  export default page;