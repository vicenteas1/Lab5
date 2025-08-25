import "./home.page.scss";

export default function Home() {
  return (
    <>
      <section className="d-flex align-items-center justify-content-center home">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1>Bootcamp UDD Desarrollo Fullstack</h1>
              <p className="lead">Laboratorio 5 - Cohorte 19</p>
              <p>
                En este proyecto se aprendió a consumir <strong>APIs públicas</strong> y mostrar los datos en una interfaz web dinámica.
              </p>
              <p>
                Para ello utilizamos <strong>React</strong>, una biblioteca de JavaScript 
                que permite crear aplicaciones modernas de una sola página, rápidas y 
                fáciles de usar.
              </p>
              <p className="text-muted">
                El objetivo es reforzar habilidades prácticas en el desarrollo frontend 
                y comprender cómo interactuar con servicios en línea mediante APIs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
