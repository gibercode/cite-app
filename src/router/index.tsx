import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { Home, Incidents, MapPage, NotFound } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "incidencias",
        element: <Incidents />,
      },
      {
        path: "mapa",
        element: <MapPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
