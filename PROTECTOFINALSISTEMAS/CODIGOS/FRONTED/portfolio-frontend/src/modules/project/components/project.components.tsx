import Image from "next/image"; 
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';

const projectData = [
  {
    title: "Dieta High Carb",
    description: "Proyecto relacionado con nutrición y recetas saludables.",
    imageUrl:
      "https://res.cloudinary.com/dpnfdcar1/image/upload/v1747663057/cld-sample-4.jpg",
    items: [
      "Fruta y jugo de fruta.",
      "Cereal, pan, pasta y arroz.",
      "Leche y productos lácteos, leche de soja.",
      "Frijoles, legumbres y lentejas.",
      "Verduras con almidón como las patatas y el maíz.",
      "Alimentos dulces como galletas, caramelo, torta, mermelada, jalea, miel y otros alimentos que contienen azúcar adicionada.",
    ],
  },
  {
    title: "Dieta proteica",
    description: "Enfatiza el consumo de alimentos ricos en proteínas, como carnes magras, pescado, aves, huevos, lácteos bajos en grasa, legumbres y frutos secos.",
    imageUrl:
      "https://res.cloudinary.com/dpnfdcar1/image/upload/v1747663046/samples/food/fish-vegetables.jpg",
       items: [
      "Proteína de soja",
"Frijoles (alubias, porotos)",
"Frutos secos.",
"Pescado.",
"Pollo magro sin piel.",
"Carnes magras.",
"Carde cerdo.",    
    ],
  },
  {
    title: "Dieta Keto",
    description: "Se caracteriza por ser muy bajo en carbohidratos, moderado en proteínas y alto en grasas",
    imageUrl:
      "https://res.cloudinary.com/dpnfdcar1/image/upload/v1747663046/samples/food/pot-mussels.jpg",
          items: [
"Carnes y Pescados: Pollo, res, cerdo, cordero, pavo, y pescado (salmón, atún, sardinas)...",
"Huevos: Todos los tipos de huevos están permitidos...",
"Verduras bajas en carbohidratos: Espinacas, brócoli, coliflor, calabacín, pepinos, y espárragos.",    
    ],
  },
  {
    title: "Dieta personalizada",
    description: "Quía alimentaria adaptada según tus necesidades, diseñándose con parámetros específicos para cada persona. Es una dieta a medida, que tiene en cuenta variables como el sexo, la edad, enfermedades, el estilo de vida y, cada vez más, la genética individual. ",
    imageUrl:
      "https://res.cloudinary.com/dpnfdcar1/image/upload/v1747663055/samples/dessert-on-a-plate.jpg",
        
  },
];

export default function ProjectList() {
  return (
    <section className="flex flex-row flex-wrap gap-20 justify-center p-6">
      {projectData.map((project, index) => (
        <article
          key={index}
          className="w-[300px] md:w-[350px] lg:w-[400px] bg-neutral-800 p-4 rounded-xl flex flex-col gap-3 group"
        >
          <div className="relative w-full h-[250px] overflow-hidden rounded-xl">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 duration-300"
            />
            <div className="w-full h-full opacity-0 group-hover:opacity-90 bg-neutral-900 absolute top-0 left-0 flex justify-center items-center transition-all">
              <button className="rounded-lg p-4 opacity-0 group-hover:opacity-100 bg-neutral-700 transition-all scale-0 group-hover:scale-100 duration-300">
                <VisibilityIcon sx={{ color: "#b2ff33" }} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-white font-semibold text-lg">{project.title}</h2>
            <p className="text-white text-sm">{project.description}</p>
            {project.items && (
              <ul className="list-disc list-inside text-white text-sm">
                {project.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}