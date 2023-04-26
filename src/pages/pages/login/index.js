/* eslint-disable padding-line-between-statements */
// ** React Imports
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// ** Next Imports
import { signIn } from 'next-auth/react';
import Link from 'next/link';

// @ts-ignore
import { useRouter } from 'next/router';

// ** MUI Components
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import * as yup from 'yup';

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import EyeOutline from 'mdi-material-ui/EyeOutline';

// ** Configs
import themeConfig from 'src/configs/themeConfig';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}));

// ** Yup Schema
const schema = yup.object({
  email: yup.string().email('Utilize um e-mail válido').required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório')
});

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const [mensagemErro, setMensagemErro] = useState('');

  // ** Hook
  const theme = useTheme();
  const router = useRouter();

  // const searchParams = useSearchParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    console.log(data);
    const result = await signIn("credentials", {
      username: data.email,
      password: data.senha,
      redirect: false,
    });
  
    if (result.error) {
      // Se houver um erro ao fazer login, defina a mensagem de erro
      setMensagemErro(result.error);
    } else {
      // Se o login foi bem-sucedido, redirecione o usuário para a página principal
      router.replace("/pages/home");
    }
  };


  return (
        <>
        <Box className='content-center'>
          <Card sx={{ zIndex: 1 }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
              <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Camada_1" data-name="Camada 1" viewBox="0 0 190.76 354.71" width="32" height="32"><path fill="#9155FD" d="m97.09,354.71h0c51.73,0,93.67-41.94,93.67-93.67v-33.39c0,.52-.42.94-.94.94h-60.6c-3.45,0-6.25-2.8-6.25-6.25v-.03c0-3.5,2.83-6.33,6.33-6.33h60.52c.52,0,.94.42.94.94v-27.1c0,.52-.42.94-.94.94h-60.6c-3.45,0-6.25-2.8-6.25-6.25v-.03c0-3.5,2.83-6.33,6.33-6.33h60.52c.52,0,.94.42.94.94v-27.1c0,.52-.42.94-.94.94h-60.6c-3.45,0-6.25-2.8-6.25-6.25v-.03c0-3.5,2.83-6.33,6.33-6.33h60.52c.52,0,.94.42.94.94v-27.1c0,.52-.42.94-.94.94h-60.6c-3.45,0-6.25-2.8-6.25-6.25v-.03c0-3.5,2.83-6.33,6.33-6.33h60.52c.52,0,.94.42.94.94v-9.22C190.76,42.17,148.59,0,96.56,0h0C43.23,0,0,43.23,0,96.56v6.84c0-.52.42-.94.94-.94h60.6c3.45,0,6.25,2.8,6.25,6.25v.03c0,3.5-2.83,6.33-6.33,6.33H.94c-.52,0-.94-.42-.94-.94v27.1c0-.52.42-.94.94-.94h60.6c3.45,0,6.25,2.8,6.25,6.25v.03c0,3.5-2.83,6.33-6.33,6.33H.94c-.52,0-.94-.42-.94-.94v27.1c0-.52.42-.94.94-.94h60.6c3.45,0,6.25,2.8,6.25,6.25v.03c0,3.5-2.83,6.33-6.33,6.33H.94c-.52,0-.94-.42-.94-.94v27.1c0-.52.42-.94.94-.94h60.6c3.45,0,6.25,2.8,6.25,6.25v.03c0,3.5-2.83,6.33-6.33,6.33H.94c-.52,0-.94-.42-.94-.94v29.97c0,53.62,43.47,97.09,97.09,97.09Z"></path></svg>
                <Typography
                  variant='h6'
                  sx={{
                    ml: 3,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '1.5rem !important'
                  }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Bem-Vindo ao {themeConfig.templateName}! 👋🏻
                </Typography>

              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} {...register("email")} />
                <span className='text-danger'>{errors.email?.message}</span>
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-login-password'>Senha</InputLabel>
                  <OutlinedInput
                    {...register("senha")}
                    label='Password'
                    value={values.password}
                    id='auth-login-password'
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <span className='text-danger'>{errors.senha?.message}</span>
                <Box
                  sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                >
                  <FormControlLabel control={<Checkbox />} label='Lembre-me' />
                  <Link passHref href='/'>
                    <LinkStyled onClick={e => e.preventDefault()}>Esqueceu a Senha?</LinkStyled>
                  </Link>
                </Box>
                <Button
                  fullWidth
                  size='large'
                  variant='contained'
                  sx={{ marginBottom: 7 }}
                  onClick={() => router.push('/pages/home')}
                  
                  // type='submit'
                >
                  Login
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography variant='body2' sx={{ marginRight: 2 }}>
                    Ainda não possui uma conta?
                  </Typography>
                  <Typography variant='body2'>
                    <Link passHref href='/pages/register'>
                      <LinkStyled>Criar uma conta</LinkStyled>
                    </Link>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
          <FooterIllustrationsV1 />
        </Box>
        </>
    
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
