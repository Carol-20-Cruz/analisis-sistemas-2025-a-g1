import { axiosClient } from "@/services/axios.service";
import { create } from "zustand";
//ZUSTAND ES EL QUE ALMACENA EL GESTOR 

interface Profile {
    id: string;
    name: string;
    specialty:string;
    phone:string;
    email: string;
    birthDay:string;
    location: string;
    createAt?: Date;
    updateAt?: Date;
}

type Store ={
    profile : Profile | null
    getProfile(): void
}

export const useprofileStore = create<Store>()(set => ({
    profile:null,
    getProfile: async() =>{
        try {
            //AXIOS ES UN PUENTE ENTRE BACKEN Y EL FRONTED PARA QUE TOME EL PERFIL DEPENDE DE LA RUTA QUE DEFINE 
            const {data} = await axiosClient.get<Profile>("/profile")
            set({
                profile:data
            })
            console.log(data) //VIAJA 
        } catch (e) {
            console.log(e)
        }
    },
}))
