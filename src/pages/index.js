/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable react/jsx-no-undef */
'use client'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { createContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import Image from 'react-bootstrap/Image';


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';
import CardBasic from './cards';

// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import '../../public/assents/css/styles.css';



export const MessageCallbackContext = createContext(null);



const handleMessageCallback = (msg) => {
  if (msg.tipo !== 'nada') {
    let icon = '';
    if (msg.tipo === 'sucesso')
      icon = 'success';
    else if (msg.tipo === 'erro')
      icon = 'error';

    MySwal.fire({
      position: 'center',
      icon: icon,
      title: msg.texto,
      showConfirmButton: false,
      timer: 4000,
      toast: true
    })
  }
}

const Home = () => {
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
      <div style={{ justifyContent: 'center', flexDirection: 'column', display: 'flex', alignItems: 'center'}}>
        {/* <div>
          <br />
        </div> */}
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
        
      </div>
      <div className='divCard'>
        <CardBasic />
      </div>
      
      <section className='top'>
        <div className='max-width'>
          <div className='top-content'>
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
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link passHref href=''>
                  <h6>Teste</h6>
                </Link><Link passHref href=''>
                  <h6>Teste</h6>
                </Link><Link passHref href=''>
                  <h6>Teste</h6>
                </Link>
                <Link passHref href=''>
                  <h6>Teste</h6>
                </Link>
              </Box>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

Home.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Home

