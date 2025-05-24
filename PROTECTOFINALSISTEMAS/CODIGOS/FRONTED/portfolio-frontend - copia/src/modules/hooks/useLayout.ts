export function useLayout(pathname: string) {
    const routes = [
      {
        path: "/",
        name: "Información",
      },
      {
        path: "/entrenamientos",
        name: "Entrenamientos",
      },
      {
        path: "/nutricion",
        name: "Nutrición",
      },
      {
        path: "/progreso",
        name: "Progreso",
      },

    ];
  
    const title = pathname === "/"
          ? "About"
          : pathname === "/entrenamientos"
          ? "Entrenamientos"
          : pathname === "/nutricion"
          ? "Nutrición"
          : "Progreso";
          return{
             title, routes
          }
  }
  