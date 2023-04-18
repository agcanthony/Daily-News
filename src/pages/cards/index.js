/* eslint-disable newline-before-return */
/* eslint-disable react/jsx-key */
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import CardImgTop from 'src/views/cards/CardImgTop'

import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
  container: {
    width: '90rem',
  },
});

const CardBasic = () => {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  
  useEffect(() => {
    fetch('/api/artigo')
      .then(response => response.json())
      .then(data => setRows(data.filter(artigo => artigo.publicado)))
      .catch(error => console.log(error));
  }, []);

  return (
    <Container className={classes.container} fluid>
      <Grid container spacing={6} justifyContent={'center'} padding={'25px'}>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography variant='h5'></Typography>
        </Grid>
        {rows.map(row => (
          <Grid item xs={12} sm={6} md={3}>
            <CardImgTop artigo={row} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default CardBasic
