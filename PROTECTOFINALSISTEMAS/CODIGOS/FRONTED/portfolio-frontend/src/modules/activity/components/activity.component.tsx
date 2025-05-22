import React from 'react'

export default function Activity() {
  return (
    <section className="px-4 py-8 bg-black min-h-screen">
      <div className="flex flex-col gap-6">
        {/* Primer bloque */}
        <div className="flex bg-gradient-to-br from-neutral-800 to-[#222222] px-4 py-8 rounded-xl shadow-lg">
          <div className="px-3 text-white">
            Icono
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-white text-xl">
              Beneficios
            </h3>
            <p className="text-white">
              La suscripción trae múltiples  beneficios<br /> que son tales como lo son:
            </p>
            <p className='text-blue-400 text-2xl'>Descuentos de membresia</p>
            <p className='text-blue-400 text-2xl'>Entrada a multiple eventos</p>
            <p className='text-blue-400 text-2xl'>Acceso a todas nuestras sedes</p>
            <p className='text-blue-400 text-2xl'>Entrenadores 24/7</p>
          </div>
        </div>

        {/* Segundo bloque */}
        <div className="flex bg-gradient-to-br from-neutral-800 to-[#222222] px-4 py-8 rounded-xl shadow-lg">
          <div className="px-3 text-white">
            Icono
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-white text-xl">
              Ventajas
            </h3>
            <p className="text-white">
              Acceso a contenidos exclusivos, soporte prioritario y más beneficios adaptados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
