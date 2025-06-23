
import { Container } from "../../components/container";
import { useState,useEffect } from "react";
import { collection,query,getDocs,orderBy,where } from "firebase/firestore";
import { db } from "../../services/firebaseconection";
import { Link } from "react-router-dom";

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

export function Home() {
    const [cars,setCars] = useState<CarsProps[]>([])
    const [loadimages,setLoadImages]= useState<string[]>([])
    const [input,setInput] = useState("")
   
useEffect(()=>{

        loadCars()
    },[])

     function loadCars(){
            const  carsRef = collection(db, "cars")
            const queryRef = query(carsRef,orderBy("created","desc"))

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


    function handleImagesLoad(id:string){
        setLoadImages((previmages)=> [...previmages,id] )
    }

   async function handleSearchCar(){
        if(input === ""){
          loadCars()
        }

    setCars([]);
    setLoadImages([]);

    const q = query(collection(db,"cars"),
    where("name", ">=", input.toUpperCase()),
    where("name","<=",input.toUpperCase() + "\uf8ff" /*unicode inclui tds caracteres na busca*/)
)

    const querySnapshot = await getDocs(q)

    let listCars = [] as CarsProps[]

    querySnapshot.forEach((doc) => {
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
    })
        setCars(listCars)
    }

  return (
   <Container>
   <div>
     <section className=" bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input className="w-full border-2 rounded-lg h-9 px-3 outline-none"
         placeholder="Digite o nome do carro..." 
         value={input} onChange={(e) => setInput(e.target.value)}
         />
        <button className=" bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
        onClick={handleSearchCar}
        >Pesquisar</button>
     </section>

     <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados para todo o Portugal </h1>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">


          

        {cars.map(car => (
  <Link to={`/car/${car.id}`} key={car.id}>
             <section  className=" bg-white rounded-lg max-w-xs w-full">
                 <div style={{display: loadimages.includes(car.id) ? "none" : "block"}}
                 className="w-full h-72 rounded-lg bg-slate-200"></div>
                <img className="w-full max-w-xs rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                src=/*{car.images[0].url}*/"https://th.bing.com/th/id/OIP.I7OSDqORqo5HFVm6gQQaFAHaE_?w=243&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="carro"
                 onLoad={ ()=> handleImagesLoad(car.id)}
                 style={{display: loadimages.includes(car.id) ? "block" : "none"}}
                 />
                <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

                <div className="flex flex-col px-2">
                    <span className="text-zinc-700 mb-6">Ano {car.year} | {car.km} km</span>
                    <strong className="text-black font-medium text-xl">R$ {car.price}</strong>
                </div>

            <div className="w-full h-px bg-slate-300 my-2"></div>

            <div className="px-2 pb-2">
                <span className="text-zinc-700">
                    {car.city}
                </span>
            </div>

            </section>
 </Link>
           ))}

           
            
            
        </main>
   </div>
   </Container>
  )
}


