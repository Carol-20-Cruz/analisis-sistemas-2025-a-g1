import React from "react";

export default function SoftSkill() {
  return (
    <div className="py-5 px-8 rounded-lg shadow-lg bg-neutral-800 flex justify-between border border-cyan-500">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="bg-neutral-700 p-3 rounded-xl flex">🧠</div>
          <h3 className="text-lg text-white font-semibold">Habilidades Mentales</h3>
        </div>
        <p className="text-white">
          El ejercicio es bueno no solo para la salud física. Recuerda que un cuerpo sano también fortalece la mente.
        </p>
      </div>
    </div>
  );
}