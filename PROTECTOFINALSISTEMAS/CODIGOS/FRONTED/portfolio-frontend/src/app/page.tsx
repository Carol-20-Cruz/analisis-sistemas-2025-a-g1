"use client";

import Activity from "@/modules/activity/components/activity.component";
import Layout from "@/modules/layouts/layout";
import SoftSkill from "@/modules/soft-skill/components/soft-skill.component";

export default function Home() {
  return (
    <Layout>
    
      <section className="text-white">
        <h4 className="text-cyan-300 font-semibold text-5xl">Bienvenido al Gym</h4>
      </section>

    
      <section className="mt-8">
        <h2 className="text-white font-semibold text-2xl">¿Qué estás esperando?</h2>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Activity />
        </div>
      </section>

     
      <section className="mt-8">
        <h2 className="text-white font-semibold text-2xl">Habilidades Blandas</h2>
        <div className="grid grid-cols-2 gap-3 mt-10">
          <SoftSkill />
        </div>
      </section>
    </Layout>
  );
}