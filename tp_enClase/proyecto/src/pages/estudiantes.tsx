// src/pages/Estudiantes.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../App.css'; // Ajusta según la ubicación del CSS

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

const Estudiantes = () => {
  const [searchParams] = useSearchParams();
  const cursoId = searchParams.get('curso');
  const [curso, setCurso] = useState<Curso | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cursoId) {
      setError('No se ha seleccionado ningún curso.');
      return;
    }

    fetch('http://localhost:3001/cursos')
      .then((res) => {
        if (!res.ok) throw new Error('Respuesta no OK');
        return res.json();
      })
      .then((data: Curso[]) => {
        const cursoEncontrado = data.find((c) => c.id === parseInt(cursoId));
        if (cursoEncontrado) {
          setCurso(cursoEncontrado);
        } else {
          setError('Curso no encontrado.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar el curso.');
      });
  }, [cursoId]);

  return (
    <div className="page-container">
      <div className="content-container">
        <h1>Estudiantes {curso && `de: ${curso.nombre}`}</h1>
        {error ? (
          <div>
            <p>{error}</p>
            <Link to="/cursos">Volver a cursos</Link>
          </div>
        ) : (
          <>
            {curso ? (
              <ul>
                {curso.estudiantes.map((estudiante) => (
                  <li key={estudiante.id}>
                    {estudiante.nombre} - {estudiante.edad} años
                  </li>
                ))}
              </ul>
            ) : (
              <p>Cargando datos...</p>
            )}
            <Link to="/cursos">Volver a cursos</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Estudiantes;
