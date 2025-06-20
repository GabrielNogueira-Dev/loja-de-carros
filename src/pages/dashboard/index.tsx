import { useEffect,useState,useContext } from "react"
import { collection,getDocs,where, query,doc,deleteDoc } from "firebase/firestore"
import { db } from "../../services/firebaseconection"
import { AuthContext } from "../../context/AuthContext"

import { Container } from "../../components/container"
import { PainelHeader } from "../../components/painelheader"

import { FiTrash2 } from "react-icons/fi"

interface CarsProps {
    id:string;
    name:string;
    year:string;
    uid:string;
    price:string | number;
    city:string;
    km:string;
    images:CarImageProps[];
    
}

interface CarImageProps{
    name:string;
    uid:string;
    url:string;
}

export function Dashboard() {
 const [cars,setCars] = useState<CarsProps[]>([])
 const {user} = useContext(AuthContext)

 useEffect(()=>{
  
        function loadCars(){
          if(!user?.uid){
            return
          }

            const  carsRef = collection(db, "cars")
            const queryRef = query(carsRef,where("uid", "==", user.uid))

            getDocs(queryRef)
            .then((snapshot)=>{
            let listCars = [] as CarsProps[]
                
            snapshot.forEach(doc => {
                listCars.push({
                    id:doc.id,
                    name:doc.data().name,
                    year:doc.data().year,
                    km:doc.data().km,
                    city:doc.data().city,
                    price:doc.data().price,
                    images:doc.data().images,
                    uid:doc.data().uid
                })  
            });
            setCars(listCars)
           // console.log(listCars) ver se esta mostrando a lista
        })

        }

        loadCars()
    },[user])

async function handleDeleteCar(id:string) {
  const docRef = doc(db,"cars",id)
  await deleteDoc(docRef)
  setCars(cars.filter(car => car.id !== id))
}

  return (
   <div>
<Container>
    <PainelHeader/>

<main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  
  {cars.map(car=>(
    <section key={car.id}
     className="w-full bg-white rounded-lg relative"> 

   <button onClick={ ()=> handleDeleteCar(car.id) }
    className=" cursor-pointer absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow">
    <FiTrash2  size={26} color="black"/>
   </button>

    <img className=" w-full rounded-lg mb-2 max-h-70"
   src="https://th.bing.com/th/id/OIP.eIknJM5OAK6R51BVsYjv3gHaE7?w=283&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="" />
   <p className="font-bold mt-1 px-2 mb-2">carro</p>

<div className="flex flex-col px-2">
    <span className="text-zinc-700">
      ano {car.year}
    </span>
    <strong className="text-black font-bold mt-4">
      R$ {car.price}
    </strong>
</div>

<div className="w-full h-px bg-slate-200 my-2"></div>
<div>
  <span>
    {car.city}
  </span>
</div>

  </section>
  ))}

</main>


</Container>
   </div>
  )
}

