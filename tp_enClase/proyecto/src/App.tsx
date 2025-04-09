// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cursos from './pages/cursos';
import Estudiantes from './pages/estudiantes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta predeterminada redirecciona a /cursos */}
        <Route path="/" element={<Navigate to="/cursos" replace />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
