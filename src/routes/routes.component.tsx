import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layout/main.page";
import HomePage from "../pages/home/home.page";
import Estadisticas from "../pages/estadisticas/estadisticas.page";
import About from "../pages/about/about.page";
import Weather from "../pages/wather/wather.page";
import UnderConstruction from "../pages/under-construction/under-construction.page";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />  
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="/service/weather" element={<Weather />} />
          <Route path="/service/stadistics" element={<Estadisticas />} />
          <Route path="*" element={<UnderConstruction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
