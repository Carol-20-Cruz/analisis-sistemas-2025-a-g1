"use client";

import React from "react";

interface ActivityProps {
  title?: string;
  description?: string;
}

const Activity: React.FC<ActivityProps> = ({
  title = "Entrenamiento de fuerza",
  description = "Mejora tu fuerza muscular con rutinas personalizadas.",
}) => {
  return (
    <div className="bg-cyan-700 p-4 rounded-md shadow-md hover:bg-cyan-600 transition">
      <h3 className="text-white font-bold text-xl">{title}</h3>
      <p className="text-cyan-100 mt-2">{description}</p>
    </div>
  );
};

export default Activity;