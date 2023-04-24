/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/jsx-no-undef */
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Navbar } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import CardComent from 'src/views/cards/CardComent';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const PageArtigo = () => {
  const router = useRouter();
  const [artigo, setArtigo] = useState(null);

  useEffect(() => {
    // Recupera o id passado pela URL
    const { id } = router.query;

    // Faz a requisição para buscar o artigo correspondente
    fetch(`/api/artigo/${id}`)
      .then(response => response.json())
      .then(data => setArtigo(data[0]))
      .catch(error => console.log(error));
  }, [router.query]);

  // console.log(response)

  return (
    <>
      <Navbar className="navbar-Principal" variant="dark" expand="lg">
        <Container className='nav-container '>
          <Navbar.Brand href="#home" className='titulo'>
            <Image src="/images/LOGO.png" width={64} height={64} />
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse className='botaoLogin' id="basic-navbar-nav">
            <Link passHref href='/pages/login'>
              <Button component='a' variant='contained' sx={{ px: 5.5 }}>
                Login
              </Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className='top'>
        <div className='max-width'>
          <div className='top-content'>
            <div className='text-1'>
              <h1>Daily-News</h1>
            </div>
            <div className='text-1'>
              <h1>O Seu Blog de Noticias!</h1>
            </div>
          </div>
        </div>
      </section>
      <br />
      <div className='divCard'>
        {artigo ? (
          <div className='divArtigo'>
            <div className='imagemArtigo'>
              <Image src={artigo.urlImg} width={'1080'} />
            </div>
            <br />
            <Typography className='tituloArtigo' variant='h2'>{artigo.titulo}</Typography>
            <br />
            <Typography className='subTituloArtigo' variant='h4'>{artigo.subTitulo}</Typography>
            <br />
            <Typography className='corpoArtigo'>{artigo.texto}</Typography>
            <br />
            <Typography className='autorArtigo' variant='h6'>Autor {artigo.usuario.nome}</Typography>
            <br />
          </div>
        ) : (
          <div>Carregando...</div>
        )}

        <br />

        <div className='curtidas'>         
          <Link passHref href='/pages/login'>
            <Button component='a' sx={{ height: 2, width: 3 }}>
              <ThumbUpIcon sx={{ marginRight: 1, width: '150px' }} />              
            </Button>            
          </Link>
          <p>Curtiu!</p>
        </div>
      </div>
      <section className='divCard' >
        <hr />
        <Card className='curtidas' sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Co{bull}men{bull}tá{bull}ri{bull}os
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardComent />
          </CardContent>
        </Card>
      </section>
      <section className='divCard' >
        <div className="blog-message">
          <h2>"Leia nossos artigos ou crie o seu próprio: junte-se à comunidade do nosso blog!"</h2>
          <p>Não precisa ser um expert no assunto, basta ter vontade de aprender e compartilhar. Eu estou aqui para te ajudar no que precisar e garantir que o seu artigo seja de qualidade e relevante.</p>
          <p>Então, o que você está esperando? Vamos juntos fazer desse espaço um lugar ainda mais incrível e cheio de conteúdo de valor. Leia, comente, crie, compartilhe. A sua participação é muito importante para nós!</p>
          <a href="/pages/login" className="btn">Junte-se agora</a>
          <div className="testimonial">
            <p>"Adoro ler os artigos deste blog e sempre aprendo algo novo. Recomendo a todos que se juntem à comunidade!"</p>
            <p>- Maria, leitora do blog</p>
          </div>
        </div>
      </section>
      <div className='Footer'>
        <Navbar className="navbar-Bottom" variant="dark" expand="lg">
          <Container className='nav-container'>
            <Navbar.Brand href="#home" className='titulo'>
              {/* <Image src="/images/LOGO.png" width={64} height={64} /> */}
            </Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
            <Navbar.Collapse className='botaoLogin' id="basic-navbar-nav">
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <Link passHref href=''>
                  <h6><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M26.67 4H5.33A1.34 1.34 0 0 0 4 5.33v21.34A1.34 1.34 0 0 0 5.33 28h11.49v-9.28H13.7v-3.63h3.12v-2.67c0-3.1 1.89-4.79 4.67-4.79c.93 0 1.86 0 2.79.14V11h-1.91c-1.51 0-1.8.72-1.8 1.77v2.31h3.6l-.47 3.63h-3.13V28h6.1A1.34 1.34 0 0 0 28 26.67V5.33A1.34 1.34 0 0 0 26.67 4Z" /></svg></h6>
                </Link><Link passHref href=''>
                  <h6><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8.75a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5Z" /><path fill="currentColor" fill-rule="evenodd" d="M6.77 3.082a47.472 47.472 0 0 1 10.46 0c1.899.212 3.43 1.707 3.653 3.613a45.67 45.67 0 0 1 0 10.61c-.223 1.906-1.754 3.401-3.652 3.614a47.468 47.468 0 0 1-10.461 0c-1.899-.213-3.43-1.708-3.653-3.613a45.672 45.672 0 0 1 0-10.611C3.34 4.789 4.871 3.294 6.77 3.082ZM17 6a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm-9.75 6a4.75 4.75 0 1 1 9.5 0a4.75 4.75 0 0 1-9.5 0Z" clip-rule="evenodd" /></svg></h6>
                </Link><Link passHref href=''>
                  <h6><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM727.3 401.7c.3 4.7.3 9.6.3 14.4c0 146.8-111.8 315.9-316.1 315.9c-63 0-121.4-18.3-170.6-49.8c9 1 17.6 1.4 26.8 1.4c52 0 99.8-17.6 137.9-47.4c-48.8-1-89.8-33-103.8-77c17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35c25.1-4.7 49.1-14.1 70.5-26.7c-8.3 25.7-25.7 47.4-48.8 61.1c22.4-2.4 44-8.6 64-17.3c-15.1 22.2-34 41.9-55.7 57.6z" /></svg></h6>
                </Link>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <h6>© 2023 Daily News</h6>
              </Box>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>

  );
}
PageArtigo.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default PageArtigo;
