import { useState,useEffect } from "react"
import { Container } from "../../components/container"
import {FaWhatsapp} from 'react-icons/fa'
import { useParams } from "react-router-dom"

import { getDoc,doc } from "firebase/firestore"
import { db } from "../../services/firebaseconection"

//BIBLIOTECA SWIPER PARA SLIDE DE IMAGENS porem precisa ir no MAIN tambem
import {Swiper,SwiperSlide} from 'swiper/react'

interface CarsProps {
    id:string;
    name:string;
    model:string;
    year:string;
    uid:string;
    price:string | number;
    city:string;
    km:string;
    description:string;
    created:string;
    owner:string;
    whatsapp:string;
    images:ImagesCarProps[];
    
}

interface ImagesCarProps {
  uid:string;
  name:string;
  url:string;
}

export function CarDetail() {
  const [cars,setCars] = useState<CarsProps>()
  const {id} =useParams()
  const [sliderPerView,setSliderPerView] = useState<number>(2)

  useEffect( () =>{
    async function loadCar(){
      if(!id){return}

      const docRef = doc(db, "cars",id)
      getDoc(docRef)
      .then((snapshot)=>{
        setCars({
          id:snapshot.id,
          name:snapshot.data()?.name,
          year:snapshot.data()?.year,
          model:snapshot.data()?.model,
          uid:snapshot.data()?.uid,
          price:snapshot.data()?.price,
          city:snapshot.data()?.city,
          km:snapshot.data()?.km,
          description:snapshot.data()?.description,
          created:snapshot.data()?.created,
          owner:snapshot.data()?.owner,
          whatsapp:snapshot.data()?.whatsapp,
          images:snapshot.data()?.images,
        })
      })

    }

loadCar()

  }, [] )

useEffect(()=>{

function handleResize(){
  if(window.innerWidth <720){
    setSliderPerView(1)
  }else{
    setSliderPerView(2)
  }
  handleResize()
  window.addEventListener("resize", handleResize)
  
//quando sair para home por exemplo nao ficar chamando e voltar ao normal
  return () =>{
  window.removeEventListener("resize",handleResize)
  }

}

},[])

  return (
  <Container>
    
    <Swiper slidesPerView={sliderPerView}
            pagination = {{clickable:true}}
            navigation
    >
{cars?.images.map(image => (
  <SwiperSlide key={image.name}>
<img src={image.url} className="w-full h- object-cover" />
  </SwiperSlide>

))}

    </Swiper>

    {cars && (
      <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className=" flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{cars?.name}</h1>
             <h1 className="font-bold text-3xl text-black">R$ {cars?.price}</h1>
          </div>
          <p>{cars?.model}</p>

          <div className="flex w-full gap-6 my-4">
           <div className="flex flex-col gap-4">
        <div>
             <p>Cidade</p>
              <strong>{cars?.city}</strong>
            </div>
          <div>
            <p>Ano</p>
            <strong>{cars?.year}</strong>
          </div>
        </div>

   <div className="flex flex-col gap-4">
        <div>
             <p>Km</p>
              <strong>{cars?.km}</strong>
            </div>
          </div>
        </div>

      <strong>Descrição:</strong>
      <p className="mb-4">{cars?.description}</p>

      
      <strong>Telefone:</strong>
      <p className="mb-4">{cars?.whatsapp}</p>

      <a className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer">
     Conversar com vendedor <FaWhatsapp size={26} color="white"/> 
      </a>

      </main>
    )}
  </Container>
  )
}

