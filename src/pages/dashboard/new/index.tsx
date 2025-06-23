import { type ChangeEvent, useContext, useState } from 'react';
import { Container } from '../../../components/container';
import { PainelHeader } from '../../../components/painelheader';
import { AuthContext } from '../../../context/AuthContext';
import { FiTrash } from 'react-icons/fi';
import { FiUpload } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { _uuidv4 } from 'zod/v4/core';
import { supabase } from '../../../services/supabaseClient';
//import {storage} mas precisa pagar para ter
// import { ref, uploadBytes, getDownloadURL, deleteObject}
import { addDoc, collection, } from 'firebase/firestore';
import { db } from '../../../services/firebaseconection';

import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  model: z.string().nonempty("O modelo é obrigatório"),
  year: z.string().nonempty("O ano é obrigatório"),
  km: z.string().nonempty("A quilometragem é obrigatória"),
  price: z.string().nonempty("O preço é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value) => /^(\d{12})$/.test(value),{
    message: "O telefone deve ter 12 dígitos",
  }),
  description: z.string().nonempty("A descrição é obrigatória")
})

type FormData = z.infer<typeof schema>;

export function New() {
  const {user} = useContext(AuthContext)
  const {register, handleSubmit, formState:{errors},reset} = useForm<FormData>({
    resolver: zodResolver(schema),})

  interface ImageItemProps {
    uid:string;
    name:string;
    previewUrl:string;
    url:string;
  }

  const [carImages,setCarImages] = useState<ImageItemProps[]>([])

  function handleFile(e:ChangeEvent<HTMLInputElement>){
    if (e.target.files && e.target.files[0]){
      const image = e.target.files[0]
      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        console.log(image)
        handleUpload(image)
      }else{
        alert("Envie em formato JPEG ou PNG")
      }
    }
  }

  async function handleUpload(image: File) {
    console.log(image.name)
  if (!user?.uid) {
    alert("Usuário não está logado");
    return;
  }

  const uniqueName = `${uuidv4()}-${image.name}`;

  // Upload do arquivo
  const { data } = await supabase.storage
    .from("arquivo")
    .upload(uniqueName, image);
console.log(data)

  if (data) {
    alert("Erro ao enviar arquivo: " + data)
    return;
  }

  // Obter URL pública
  const { data: publicUrlData } = supabase.storage
    .from("arquivo")
    .getPublicUrl(uniqueName);

  // Adicionar a imagem no estado para preview
  const imageItem: ImageItemProps = {
    name: uniqueName,
    uid: user.uid,
    previewUrl: URL.createObjectURL(image),
    url: publicUrlData.publicUrl,
  };

  setCarImages((images) => [...images, imageItem]);
  toast.success("Imagem adicionada com sucesso!")
}

    /*
    // trecho comentado original - não alterei
    if(!user?.uid){
      return;
    }
    //  const currentUid = user?.uid
    //  const UidImage = uuidv4()

    //  const upLoadRef = ref(Storage,`images/${currentUid}/${UidImage}`);

    //  uploadBytes(upLoadRef,image)
    //  .then((snapshot) => {
    //    getdownloadurl(snapshot.ref).then((downloadurl)=>{
    //      console.log("URL DE ACESSO A FOTO",downloadurl)
    //      const imageItem = {
    //        name:uidImage,
    //        uid:currentUid,
    //        previewUrl: URL.createObjectURL(image),
    //        url:downloadurl,
    //    }
    //        setCarImages((images) => {...images,imageItem})
    //    })
    //  })
    */
  

  function onSubmit(data: FormData) {
   
    if(carImages.length === 0){
     toast.error("Envie uma imagem ")
      return
    }
   
      const carListImageAtt = carImages.map(car => {
        return{
          uid:car.uid,
          name:car.name,
          url:car.url
        }
      }) 

      addDoc(collection(db,"cars"),{
        name:data.name.toUpperCase(),
        model:data.model,
        whatsapp:data.whatsapp,
        city:data.city,
        year:data.year,
        km:data.km,
        price:data.price,
        description:data.description,
        created:new Date(),
        owner:user?.name,
        uid:user?.uid,
        images:carListImageAtt
      })
      .then(()=>{
        reset()
        setCarImages([])
          toast.success("Carro cadastrado com sucesso!")
      })
      .catch((err)=>{console.log(err)})

    console.log(data)
  }

async function handleDelete(ite: ImageItemProps) {

setCarImages(carImages.filter((item)=> item.url !== ite.url))
}



  return (
    <Container>
      <PainelHeader/>

      <div className='w-full  bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2'>
        <button className='border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48'>
         <div className='absolute cursor-pointer'>
          <FiUpload size={24} color="#000" />
         </div>
         <div className='cursor-pointer'>
          <input type="file" accept='image/*' 
          className='opacity-0 cursor-pointer'
             onChange={handleFile} />
         </div>
        </button>

        {carImages.map((item) => (
  <div key={item.name} className="relative w-48 h-32 rounded-lg overflow-hidden">
    <img
      src={item.previewUrl}
      alt="foto do carro"
      className="rounded-lg w-full h-full object-cover"
    />
    <button
      type="button"
      onClick={() => handleDelete(item)}
      className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-1"
      title="Deletar imagem"
    >
      <FiTrash size={18} />
    </button>
  </div>
))}
      </div>

      <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-1'>
        <form className='w-full '
        onSubmit={handleSubmit(onSubmit)}>

            <div className='mb-3'>
              <p className='mb-2 font-medium'>Nome do carro</p>
              <Input type='text'
              register={register}
              name ="name"  
              error ={errors.name?.message}
              placeholder='Ex: MERCEDEZ-BENZ GLA 250'
              />
            </div>

            <div className='mb-3'>
              <p className='mb-2 font-medium'>Modelo do carro</p>
              <Input type='text'
              register={register}
              name ="model"  
              error ={errors.model?.message}
              placeholder='Ex:  2.0 turbo '
              />
            </div>

         <div className='flex w-full mb-3 flex-row items-center gap-4'>
            
          <div className='mb-3'>
              <p className='mb-2 font-medium'>Ano do carro</p>
              <Input type='text'
              register={register}
              name ="year"  
              error ={errors.year?.message}
              placeholder='2025'
              />
           </div>

            <div className='mb-3'>
                <p className='mb-2 font-medium'>Quilometragem do carro</p>
                <Input type='text'
                register={register}
                name ="km"  
                error ={errors.km?.message}
                placeholder='30.000'
                />
            </div>

          </div>

           <div className='flex w-full mb-3 flex-row items-center gap-4'>
            
          <div className='mb-3'>
              <p className='mb-2 font-medium'>Telefone / Whatsapp </p>
              <Input type='text'
              register={register}
              name ="whatsapp"  
              error ={errors.whatsapp?.message}
              placeholder='000987456123'
              />
           </div>

            <div className='mb-3'>
                <p className='mb-2 font-medium'>Cidade </p>
                <Input type='text'
                register={register}
                name ="city"  
                error ={errors.city?.message}
                placeholder='Lisboa'
                />
            </div>

          </div>

            <div className='mb-3'>
                <p className='mb-2 font-medium'>Preço </p>
                <Input type='text'
                register={register}
                name ="price"  
                error ={errors.price?.message}
                placeholder='€ 70.000'
                />
            </div>

            <div className='mb-3'>
                <p className='mb-2 font-medium'>Descrição </p>
            <textarea className='border-2 w-full rounded-md h-24 px-2'
            {...register("description")} 
            name='description'
            id='description'
            placeholder='Digite a descrição do carro'
            />
            {errors.description && <p className='mb-1 text-red-500'>{errors.description.message}</p>}

            </div>
          <button type='submit' className=' cursor-pointer hover:text-gray-100 hover:bg-blue-700 w-full h-10 rounded-md bg-blue-800 text-white font-medium'>
           Cadastrar
          </button>

        </form>
      </div>
    </Container>
  )
}
