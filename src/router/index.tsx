import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

const Page = ({ title }: { title: string }) => <h1>{title}</h1>;

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
        element: <Page title="Dashboard" />,
      },
      {
        path: "incidencias",
        element: <Page title="Incidencias" />,
      },
      {
        path: "mapa",
        element: <Page title="Mapa" />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
