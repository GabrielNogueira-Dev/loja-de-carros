import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Link } from 'react-router-dom'

import { Input } from '../../components/input'
import {useForm} from  'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const schema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').nonempty('Senha é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function Login() {
 const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver:zodResolver(schema),
    mode: 'onChange'
 })

function onsubmit(data: FormData){
console.log(data)
}

  return (
 <Container>
      <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
  <Link to="/" className='mb-6 max-w-sm w-full'>
    <img className='w-full'
    src={logoImg} alt="logo" />
  </Link>
  
<form className='bg-white max-w-xl w-full rounded-lg'
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
  
<button>Acessar</button>

</form>

   </div>
 </Container>
  )
}

