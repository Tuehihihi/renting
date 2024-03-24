import Image from "next/image";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getCars, { ICarsParams } from "./actions/getCars";
import CarCard from "./components/cars/CarCard";
import getCurrentUser from "./actions/getCurrentUser";
import Chatbot from "./components/Chatbot";
interface HomeProps {
  searchParams: ICarsParams
}
const Home = async ( {searchParams}: HomeProps) => {
  const isEmpty = true;
  const cars = await getCars(searchParams);
  const currentUser = await getCurrentUser()
  if(cars?.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          
            {cars?.map((car) => {
              return(
                <CarCard 
                currentUser={currentUser}
                  key = {car.id}
                  data = {car}
                />
              )
            })}
          
        </div>
      </Container>
      <Chatbot />
    </ClientOnly>
  );
}
export default Home;
