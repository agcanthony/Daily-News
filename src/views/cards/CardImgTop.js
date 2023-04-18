// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const CardImgTop = ({ artigo }) => {
  const truncate = (input) =>
      input?.length > 30 ? `${input.substring(0, 30)}...` : input;
  
  
  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image={artigo.urlImagem} />
      <CardContent>
        <Typography variant='h5' sx={{ marginBottom: 2 }}>
          {artigo.titulo}
        </Typography>
        <Typography variant='body2'>
          {truncate(artigo.texto)}
        </Typography>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>          
          {artigo.usuario.nome}
        </Typography>

      </CardContent>
    </Card>
  )
}

export default CardImgTop

