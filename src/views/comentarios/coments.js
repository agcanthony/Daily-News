/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable newline-before-return */
/* eslint-disable react/jsx-no-undef */
// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

// ** Icons Imports
import Heart from 'mdi-material-ui/Heart'

const adicionarComentario = async (artigos) => {
    const artigosComComentario = [];
    for (const artigo of artigos) {
        const response = await fetch(`/api/comentario/${artigo.id}`);
        const comentario = await response.json();
        artigosComComentario.push({ ...artigo, comentario: comentario.length });
    }
    return artigosComComentario;
};


const Coments = ({ artigo }) => {

    const [usuarios, setUsuarios] = useState([]);

    console.log(artigo);
    const [rows, setRows] = useState([]);
    const [rows2, setRows2] = useState([]);

    useEffect(() => {
        fetch(`/api/comentarios/${artigo.id}`)
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(error => console.log(error));
    }, []);

    console.log(rows)
    useEffect(() => {
        fetch('/api/usuario')
          .then(response => response.json())
          .then(data => setUsuarios(data))
          .catch(error => console.log(error));
      }, []);

      const encontrarUsuarioPorId = (id) => {
        if (typeof id !== 'number' || isNaN(id)) {
            return null;
        }
        return usuarios.find(usuario => usuario.id === id);
    }
    

    return (
        <>
            <div className='comentarios'>
                <Grid container spacing={2}>
                    {rows.map(row => (
                        <Grid item xs={12} sm={3} md={3}>
                            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: 'primary.main' }}>
                                <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                                    <Typography
                                        variant='h6'
                                        sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
                                    >
                                        <Heart sx={{ marginRight: 1.25 }} />
                                        {artigo.titulo}
                                    </Typography>
                                    <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                                        {row.texto}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                            <Avatar alt='Eugene Clarke' src='/images/avatars/1.png' sx={{ width: 34, height: 34, marginRight: 2.75 }} />
                                            <Typography variant='body2' sx={{ color: 'common.white' }}>
                                                {encontrarUsuarioPorId(row.usuarioID)?.nome}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                            <br />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    )
}

export default Coments
