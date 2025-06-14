import { Container } from '../../../components/container';
import { PainelHeader } from '../../../components/painelheader';

import { FiUpload } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
 const {register, handleSubmit, formState:{errors},reset} = useForm<FormData>({
  resolver: zodResolver(schema),})

  function onSubmit(data: FormData) {
    console.log(data);
   

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
          <input type="file" accept='image/*' className='opacity-0 cursor-pointer' />
         </div>
        </button>
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

