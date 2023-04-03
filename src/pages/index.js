/* eslint-disable react/jsx-no-undef */
'use client'


import Button from '@mui/material/Button';
import Link from 'next/link';
import { createContext } from "react";
import { Container, Navbar } from "react-bootstrap";

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
        <Container className='nav-container'>
          <Navbar.Brand href="#home" className='titulo'>Daily News</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav" >            
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
      <CardBasic/>
      <br />
      <Navbar fixed="bottom" expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

Home.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Home

