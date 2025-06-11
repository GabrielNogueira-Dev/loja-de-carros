import { useEffect } from 'react'
import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Link,useNavigate } from 'react-router-dom'

import { Input } from '../../components/input'
import {useForm} from  'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { signInWithEmailAndPassword,signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseconection' 

const schema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    password: z.string().nonempty('Senha é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function Login() {
const navigate = useNavigate()

 const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver:zodResolver(schema),
    mode: 'onChange'
 })

 useEffect(() =>{
async function handleLogout(){
  await signOut(auth)
  console.log('Usuário deslogado com sucesso!')
  navigate('/', {replace: true})
}
handleLogout();
 },[] )

function onsubmit(data: FormData){

  signInWithEmailAndPassword(auth, data.email, data.password)
  .then(async(user)=>{
  
    navigate('/dashboard', {replace: true})
    console.log('Usuário logado com sucesso!',user)
  })
  .catch((error) => {
    console.error('Erro ao fazer login:', error);
  })

}

  return (
 <Container>
      <div className=' w-full min-h-screen flex justify-center items-center flex-col gap-4'>
  <Link to="/" className='mb-6 max-w-sm w-full'>
    <img className='w-full'
    src={logoImg} alt="logo" />
  </Link>
  
<form className='bg-white max-w-xl w-full rounded-lg p-4'
    onSubmit={handleSubmit(onsubmit)}
>
        

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
>Acessar</button>

</form>

<Link to="/register"> Ainda não possui cadastro ? <span className='text-blue-500'>Cadastre-se</span> </Link>

   </div>
 </Container>
  )
}

