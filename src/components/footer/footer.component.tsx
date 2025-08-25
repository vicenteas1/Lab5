export default function Footer() {
  return (
    <footer className="mt-auto py-3 border-top ">
      <div className="container text-muted small d-flex justify-content-center">
        © {new Date().getFullYear()} WeatherApp — Todos los derechos reservados - Laboratorio 5 Bootcamp UDD Cohorte 19
      </div>
    </footer>
  );
}
