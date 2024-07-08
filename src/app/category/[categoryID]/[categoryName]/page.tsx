import HomeContainer from "@/components/HomeContainer/HomeContainer";

const page = ({ params }: { params: { categoryID: number; categoryName: string } }) => {
    const categoryId = params.categoryID;
    const name = params.categoryName;
    const searchID = "";
    return (
      <>
      <HomeContainer  categoryId={categoryId} name={name} searchID={searchID} />
      </>
    );
  };
  
  export default page;  