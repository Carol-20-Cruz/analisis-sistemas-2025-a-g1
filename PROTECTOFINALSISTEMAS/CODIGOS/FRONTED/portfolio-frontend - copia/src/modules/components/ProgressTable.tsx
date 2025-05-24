'use client'
import React, { useState } from 'react'

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export default function ProgressTable() {
  const [cumplidos, setCumplidos] = useState(
    diasSemana.map(() => ({ nutricion: false, entrenamiento: false }))
  )

  const [nombre, setNombre] = useState('')
  const [peso, setPeso] = useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [registros, setRegistros] = useState<any[]>([])

  const toggleCheckbox = (index: number, tipo: 'nutricion' | 'entrenamiento') => {
    const nuevoEstado = [...cumplidos]
    nuevoEstado[index][tipo] = !nuevoEstado[index][tipo]
    setCumplidos(nuevoEstado)
  }

  const totalCampos = cumplidos.length * 2
  const totalCumplidos = cumplidos.reduce(
    (acc, dia) => acc + Number(dia.nutricion) + Number(dia.entrenamiento),
    0
  )
  const porcentaje = (totalCumplidos / totalCampos) * 100

  const enviarInformacion = () => {
    if (!nombre || !peso || !identificacion) {
      alert('Por favor completa todos los campos personales.')
      return
    }

    const dataFormateada = {
      nombre,
      peso,
      identificacion,
      cumplimiento: diasSemana.map((dia, index) => ({
        dia,
        nutricion: cumplidos[index].nutricion,
        entrenamiento: cumplidos[index].entrenamiento
      })),
      porcentaje: porcentaje.toFixed(0)
    }

    setRegistros(prev => [...prev, dataFormateada])

    // Reiniciar formulario si se desea
    setNombre('')
    setPeso('')
    setIdentificacion('')
    setCumplidos(diasSemana.map(() => ({ nutricion: false, entrenamiento: false })))
  }

  return (
    <section className='mt-10'>
      <h2 className='text-2xl text-cyan-300 font-semibold mb-4'>Cumplimiento semanal</h2>

      {/* Formulario de datos personales */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <input
          type='text'
          placeholder='Nombre'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className='p-2 rounded-xl bg-cyan-900 text-white placeholder:text-gray-400'
        />
        <input
          type='number'
          placeholder='Peso (kg)'
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className='p-2 rounded-xl bg-cyan-900 text-white placeholder:text-gray-400'
        />
        <input
          type='text'
          placeholder='Identificación'
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
          className='p-2 rounded-xl bg-cyan-900 text-white placeholder:text-gray-400'
        />
      </div>

      {/* Tabla de días y cumplimiento */}
      <table className='w-full table-auto text-left border border-cyan-700 rounded-xl overflow-hidden mb-4'>
        <thead className='bg-cyan-800 text-white'>
          <tr>
            <th className='p-2'>Día</th>
            <th className='p-2'>Nutrición</th>
            <th className='p-2'>Entrenamiento</th>
          </tr>
        </thead>
        <tbody>
          {diasSemana.map((dia, index) => (
            <tr key={dia} className='even:bg-cyan-950 text-cyan-50'>
              <td className='p-2'>{dia}</td>
              <td className='p-2'>
                <input
                  type='checkbox'
                  checked={cumplidos[index].nutricion}
                  onChange={() => toggleCheckbox(index, 'nutricion')}
                  className='scale-125 accent-green-400'
                />
              </td>
              <td className='p-2'>
                <input
                  type='checkbox'
                  checked={cumplidos[index].entrenamiento}
                  onChange={() => toggleCheckbox(index, 'entrenamiento')}
                  className='scale-125 accent-blue-400'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className='text-cyan-200 mb-4'>
        Porcentaje de cumplimiento semanal: <strong>{porcentaje.toFixed(0)}%</strong>
      </p>

      <button
        onClick={enviarInformacion}
        className='bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-700 transition-all'
      >
        Enviar información
      </button>

      {/* Mostrar registros guardados */}
      {registros.length > 0 && (
        <div className='mt-10'>
          <h3 className='text-xl text-cyan-400 font-semibold mb-2'>Registros guardados</h3>
          {registros.map((registro, idx) => (
            <div key={idx} className='bg-cyan-950 p-4 rounded-xl mb-4 text-cyan-100'>
              <p><strong>Nombre:</strong> {registro.nombre}</p>
              <p><strong>Peso:</strong> {registro.peso} kg</p>
              <p><strong>Identificación:</strong> {registro.identificacion}</p>
              <p><strong>Cumplimiento:</strong></p>
              <ul className='list-disc list-inside'>
                {registro.cumplimiento.map((d: any, i: number) => (
                  <li key={i}>
                    {d.dia}: Nutrición - {d.nutricion ? '✔️' : '❌'}, Entrenamiento - {d.entrenamiento ? '✔️' : '❌'}
                  </li>
                ))}
              </ul>
              <p className='mt-2'><strong>Porcentaje:</strong> {registro.porcentaje}%</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
