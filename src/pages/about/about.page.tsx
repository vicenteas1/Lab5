import "./about.page.scss";

export default function About() {
  return (
    <>
      <section className="d-flex align-items-center justify-content-center about-us">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1>Sobre este proyecto</h1>
              <p>
                Este proyecto fue desarrollado como parte del Bootcamp Fullstack de la Universidad del Desarrollo. 
                Su objetivo es aplicar los conocimientos adquiridos en tecnologías frontend y backend mediante 
                la construcción de una aplicación práctica.
              </p>
              <p>
                La aplicación permite consultar información del clima en distintas ciudades, entregando una 
                experiencia sencilla y útil para el usuario, además de reforzar buenas prácticas de desarrollo 
                moderno con React.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
