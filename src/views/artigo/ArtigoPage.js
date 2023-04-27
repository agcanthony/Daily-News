import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const ArtigoPage = () => {  
  const [artigo, setArtigo] = useState(null);

  useEffect(() => {
    fetch('/api/artigo')
      .then(response => response.json())
      .then(data => setArtigo(data))      
      .catch(error => console.log(error));
  }, []);

  if (!artigo) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <>
      <Typography variant="h4">{artigo.titulo}</Typography>
      <Typography>{artigo.texto}</Typography>
      {/* outros elementos da página */}
    </>
  );
};

export default ArtigoPage;
