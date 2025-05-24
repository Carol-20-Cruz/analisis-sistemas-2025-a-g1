import Image from "next/image";
import React, { useEffect } from "react";
import Profile from "../profile/components/profile.component";
import { useprofileStore } from "@/stores/profile.store";

export default function Aside() {
  const getProfile = useprofileStore((state) => state.getProfile);
  const profile = useprofileStore((state) => state.profile);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <aside className="flex flex-col w-1/4 px-4 py-5 bg-neutral-900 my-14 rounded-lg justify-between">
      <div className="flex flex-col gap-5 items-center mt-5">
        <div className="bg-neutral-800 p-5 rounded-[30px]">
          <Image
            src="/logo.png" // Asegúrate de que esta imagen exista en /public
            alt="logo"
            width={100}
            height={100}
            className="rounded-full w-[100px] h-[100px]"
          />
        </div>
        <h1 className="text-white font-bold text-2xl text-center">
          {profile?.name || "Nombre no disponible"}
        </h1>
        <span className="bg-neutral-700 px-3 py-2 rounded-lg text-white text-sm">
          {profile?.specialty || "Especialidad no disponible"}
        </span>
      </div>

      <div className="flex flex-col items-center gap-5 mb-5">
        <Profile />
      </div>
    </aside>
  );
}
