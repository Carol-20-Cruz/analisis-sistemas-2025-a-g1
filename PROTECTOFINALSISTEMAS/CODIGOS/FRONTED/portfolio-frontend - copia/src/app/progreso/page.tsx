'use client'
import Achievement from '@/modules/components/achievement'
import Percentage from '@/modules/components/percentage'
import Layout from '@/modules/layouts/layout'
import Image from 'next/image'
import { useProgreso } from './store/progreso.store'
import ProgressTable from '@/modules/components/ProgressTable' // Importación del nuevo componente
import React, { useEffect } from 'react'

export default function Progreso() {
  const { progreso, fetchProgreso } = useProgreso(); 

  useEffect(() => {
    fetchProgreso()
  }, [])

  return (
    <Layout>
      <section className='mt-12'>
        <article className='flex items-center gap-5 mb-10'>
          <div className='bg-gradient-to-br from-amber-50 to-cyan-300 rounded-xl p-4 relative flex items-center ml-3'>
            <span className='border-r border-b-cyan-400 w-[1px] h-10 absolute -bottom-10' />
          </div>
          <h2 className='text-2xl text-cyan-50 font-semibold'>Mira tu progreso</h2>
        </article>

        {/* Logros fijos */}
        <Achievement 
          title="Iniciaste "
          date="2019"
          description="Completaste tu carrera con éxito. ¡Felicidades!"
        />

        <Achievement 
          title="Curso de React Avanzado"
          date="2024"
          description="Aprendiste componentes, hooks y routing en profundidad."
          isLast
        />
      </section>

      <section className='text-right'>
        <div className="w-[150px] h-[200px] rounded-xl overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dpnfdcar1/image/upload/v1747688001/bg_f8f8f8-flat_750x_075_f-pad_750x1000_f8f8f8_ugea9t.jpg"
            alt="Progreso físico"
            width={600}
            height={400}
          />
        </div>
      </section>

      {/* Ejemplo dinámico de progreso */}
      <section className='mt-10'>
        <h2 className='text-2xl text-cyan-300 font-semibold'>Progreso corporal</h2>
        <article className='bg-gradient-to-br from-cyan-900 to-neutral-900 rounded-xl p-4 flex flex-col mt-5'>
          {progreso.length > 0 ? (
            progreso.map((item, i) => (
              <div key={i} className="mb-4">
                <p className="text-white font-semibold">Fecha: {new Date(item.date).toLocaleDateString()}</p>
                <Percentage 
                  label="Peso"
                  percentage={item.weight}
                  fromColor="from-blue-400"
                  toColor="to-blue-700"
                />
                {item.bodyFat !== undefined && (
                  <Percentage 
                    label="Grasa corporal"
                    percentage={item.bodyFat}
                    fromColor="from-green-300"
                    toColor="to-green-600"
                  />
                )}
                {item.notes && (
                  <p className="text-gray-300 mt-1 italic">Notas: {item.notes}</p>
                )}
              </div>
            ))
          ) : (
            <p className='text-gray-400'> Registros de progreso.</p>
          )}
        </article>
      </section>

      {/* Tabla de cumplimiento semanal */}
      <ProgressTable />
    </Layout>
  )
}

