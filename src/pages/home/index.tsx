import { Container } from "../../components/container";



export function Home() {
 
  return (
   <Container>
   <div>
     <section className=" bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input className="w-full border-2 rounded-lg h-9 px-3 outline-none"
         placeholder="Digite o nome do carro..." />
        <button className=" bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
        >Pesquisar</button>
     </section>

     <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados para todo o Portugal </h1>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">

            <section className=" bg-white rounded-lg max-w-xs w-full">

                <img className="w-full max-w-xs rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202506/20250610/honda-civic-2-0-16v-flexone-ex-4p-cvt-wmimagem14511378033.webp?s=fill&w=552&h=414&q=60" alt=""
                 />
                <p className="font-bold mt-1 mb-2 px-2">BMW 320i</p>

                <div className="flex flex-col px-2">
                    <span className="text-zinc-700 mb-6">Ano 2016/2016 | 23.000 km</span>
                    <strong className="text-black font-medium text-xl">R$ 190.000</strong>
                </div>

            <div className="w-full h-px bg-slate-300 my-2"></div>

            <div className="px-2 pb-2">
                <span className="text-zinc-700">
                    Braga -Braga
                </span>
            </div>

            </section>

            <section className="bg-white rounded-lg max-w-xs w-full">

                <img className="w-full max-w-xs rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202506/20250610/honda-civic-2-0-16v-flexone-ex-4p-cvt-wmimagem14511378033.webp?s=fill&w=552&h=414&q=60" alt=""
                 />
                <p className="font-bold mt-1 mb-2 px-2">BMW 320i</p>

                <div className="flex flex-col px-2">
                    <span className="text-zinc-700 mb-6">Ano 2016/2016 | 23.000 km</span>
                    <strong className="text-black font-medium text-xl">R$ 190.000</strong>
                </div>

            <div className="w-full h-px bg-slate-300 my-2"></div>

            <div className="px-2 pb-2">
                <span className="text-zinc-700">
                    Braga -Braga
                </span>
            </div>

            </section>

            <section className="bg-white rounded-lg max-w-xs w-full">

                <img className="w-full max-w-xs rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202506/20250610/honda-civic-2-0-16v-flexone-ex-4p-cvt-wmimagem14511378033.webp?s=fill&w=552&h=414&q=60" alt=""
                 />
                <p className="font-bold mt-1 mb-2 px-2">BMW 320i</p>

                <div className="flex flex-col px-2">
                    <span className="text-zinc-700 mb-6">Ano 2016/2016 | 23.000 km</span>
                    <strong className="text-black font-medium text-xl">R$ 190.000</strong>
                </div>

            <div className="w-full h-px bg-slate-300 my-2"></div>

            <div className="px-2 pb-2">
                <span className="text-zinc-700">
                    Braga -Braga
                </span>
            </div>

            </section>
            
        </main>
   </div>
   </Container>
  )
}


