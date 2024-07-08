import HomeContainer from "@/components/HomeContainer/HomeContainer";

const page = ({ params }: { params: { searchID: string} }) => {
    const categoryId = null;
    const name = null;
    const searchID = params.searchID;
    return (
      <>
      <HomeContainer  categoryId={categoryId} name={name} searchID={searchID}  />
      </>
    );
  };
  
  export default page; 