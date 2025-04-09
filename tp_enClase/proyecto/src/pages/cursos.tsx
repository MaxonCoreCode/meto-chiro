// src/pages/Cursos.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Asegurate de importar los estilos, puede ser App.css según corresponda

interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
}

interface Curso {
  id: number;
  nombre: string;
  estudiantes: Estudiante[];
}

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/cursos')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Respuesta no OK');
        }
        return res.json();
      })
      .then((data: Curso[]) => setCursos(data))
      .catch((err) => {
        console.error(err);
        setError('Error al cargar los cursos.');
      });
  }, []);

  return (
    <div className="page-container">
      <div className="content-container">
        <h1>Cursos</h1>
        {error && <p>{error}</p>}
        <div className="cards-container">
          {cursos.map((curso) => (
            <div key={curso.id} className="card">
              <h2>{curso.nombre}</h2>
              <p>Cantidad de alumnos: {curso.estudiantes.length}</p>
              <Link to={`/estudiantes?curso=${curso.id}`}>
                Ver estudiantes
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cursos;
