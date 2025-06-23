

import { useContext, useEffect } from 'react'
import { signOut } from 'firebase/auth'

import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Link,useNavigate } from 'react-router-dom'

import { Input } from '../../components/input'
import {useForm} from  'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'
import { auth } from '../../services/firebaseconection'
import { AuthContext } from '../../context/AuthContext'

import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').nonempty('Nome é obrigatório'),  
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').nonempty('Senha é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function Register() {
  const { handleInfoUser } = useContext(AuthContext)

  const navigate = useNavigate()

 const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver:zodResolver(schema),
    mode: 'onChange'
 })

  useEffect(() =>{
 async function handleLogout(){
   await signOut(auth)
   console.log('Usuário deslogado com sucesso!')
   
 }

 handleLogout();
  },[] )

async function onsubmit(data: FormData){

  createUserWithEmailAndPassword(auth,data.email, data.password)
  .then(async (user) => {
    await updateProfile(user.user,{
      displayName: data.name
    })
handleInfoUser({
  uid: user.user.uid,
  name: data.name,
  email: data.email,
})

console.log('Usuário cadastrado com sucesso!')
toast.success("Bem vindo ao Web carros!")
navigate('/dashboard',{replace:true})
  })
  .catch((error) => {
    console.error('Erro ao cadastrar usuário:', error);

  });

}

  return (
 <Container>
      <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
  <Link to="/" className='mb-6 max-w-sm w-full'>
    <img className='w-full'
    src={logoImg} alt="logo" />
  </Link>
  
<form className='bg-white max-w-xl w-full rounded-lg p-4'
    onSubmit={handleSubmit(onsubmit)}
>

      <div className='mb-3'>
         <Input type="text"
 placeholder="Digite seu nome"
 name="name" 
 error={errors.name?.message}
 register= {register}
/>
      </div>  

<div className='mb-3'>
    <Input type="email"
 placeholder="Digite seu email"
 name="email" 
 error={errors.email?.message}
 register= {register}
/>
</div>

<div className='mb-3'>
    <Input type="password"
 placeholder="Digite sua senha"
 name="password" 
 error={errors.password?.message}
 register= {register}
/>
</div>
  
<button className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium' 
        type="submit"
>Cadastrar</button>

</form>

<Link to="/login">
Já possui uma conta? <span className='cursor-pointer text-blue-500'>Faça login</span>  
</Link>

   </div>
 </Container>
  )
}

