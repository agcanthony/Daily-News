// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import CardImgTop from 'src/views/cards/CardImgTop'

const CardBasic = () => {
  return (

    <Grid container spacing={6} justifyContent={'center'} padding={'25px'}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'></Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardImgTop />
      </Grid>
      
      
    </Grid>
  )
}

export default CardBasic
