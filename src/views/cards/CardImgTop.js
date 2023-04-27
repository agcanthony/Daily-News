/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-html-link-for-pages */
// ** MUI Imports
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

const CardImgTop = ({ artigo, curtidas }) => {
  const dataFormatter = new Date(artigo.dataPublicacao);
  const dataPublica = dataFormatter.toLocaleDateString('pt-BR');

  const truncateArtigo = (input) =>
    input?.length > 20 ? `${input.substring(0, 20)}...` : input;

  const truncateSubTitulo = (input) =>
    input?.length > 30 ? `${input.substring(0, 30)}...` : input;

  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image={artigo.urlImg} />
      <CardContent>
        <Typography variant='h5' sx={{ marginBottom: 2 }}>
          {truncateArtigo(artigo.titulo)}
        </Typography>
        <Typography variant='body2'>
          {truncateSubTitulo(artigo.texto)}
        </Typography>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {artigo.usuario.nome}
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <Link passHref href={`/pages/pageArtigo?id=${artigo.id}`}>
            <a className="btn">Ler Artigo</a>
          </Link>
          <Typography>
            <ThumbUpIcon sx={{marginRight: 1}} />
            {curtidas}
          </Typography>
        </Typography>
        <Typography variant='body2' sx={{ marginTop: 2 }}>
          Publicado em: {dataPublica}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardImgTop

