/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-no-undef */
// ** MUI Imports
// ** React Imports

import { Fragment, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form"
import * as yup from "yup"

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

export const schema = yup.object({
  Nome: yup.string()
    .min(3, 'O Nome deve conter, no mínimo, 5 caracteres')
    .max(100, 'O Nome deve conter, no máximo, 20 caracteres')
    .required('O Nome é obrigatório'),
  Apelido: yup.string()
    .min(3, 'O Usuário deve conter, no mínimo, 5 caracteres')
    .max(100, 'O Usuário deve conter, no máximo, 20 caracteres')
    .required('O Usuário é obrigatório'),
  DataNascimento: yup.date()    
    .required('A Data de Nascimento é obrigatório'),
  Email: yup.string()
    .min(5, 'O Email deve conter, no mínimo, 8 caracteres')
    .max(150, 'O Email deve conter, no máximo, 50 caracteres')
    .required('O Email é obrigatória'),
  Senha: yup.string()
    .min(6, 'A senha deve conter, no mínimo, 6 caracteres')
    .max(8, 'A senha deve conter, no maximo, 8 caracteres')
    .required('A Senha é obrigatória')
}).required();

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const [busy, setBusy] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    setBusy(true);
    const url = '/api/usuario';
    var args = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        DataNascimento: data.DataNascimento.toISOString().slice(0, 10),
        codigoConfirmacao: '1',
        tipoLoginID: 3,
        ativo: true
      })
    };

    fetch(url, args).then((result) => {
      result.json().then((resultData) => {
        setBusy(false);
        if (result.status == 200) {
          alert("Operação realizada com sucesso!");
          window.location.href = "http://localhost:3000/";
        }
        else {
          //ações em caso de erro
          let errorMessage = '';
          if (resultData.errors != null) {
            const totalErros = Object.keys(resultData.errors).length;

            for (var i = 0; i < totalErros; i++) {
              errorMessage = errorMessage + Object.values(resultData.errors)[i] + "<br/>";
            }
          }
          else
            errorMessage = resultData;

            alert("Erro ao cadastrar!");
        }
      }
      )
    });
  }



  return (
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
              A aventura começa aqui 🚀
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              fullWidth
              {...register("Nome")}
              type='text'
              label='Nome'
              sx={{ marginBottom: 4 }}
            />
            <span className='text-danger'>{errors.Nome?.message}</span>
            <TextField
              autoFocus
              fullWidth
              {...register("Apelido")}
              type='text'
              label='Usuario'
              sx={{ marginBottom: 4 }}
            />
            <span className='text-danger'>{errors.Apelido?.message}</span>
            <TextField
              fullWidth
              {...register("DataNascimento")}
              type='date'
              label='Data Nascimento'
              sx={{ marginBottom: 4 }}
            />
            <span className='text-danger'>{errors.DataNascimento?.message}</span>
            <TextField
              fullWidth
              {...register("Email")}
              type='email'
              label='Email'
              sx={{ marginBottom: 4 }}
            />
            <span className='text-danger'>{errors.Email?.message}</span>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                {...register("Senha")}
                id='auth-register-password'
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
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <span className='text-danger'>{errors.Senha?.message}</span>
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>Aceito </span>
                  <Link href='/' passHref>
                    <LinkStyled onClick={e => e.preventDefault()}>privacy policy & terms</LinkStyled>
                  </Link>
                </Fragment>
              }
            />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
              Cadastrar
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Já possui uma conta?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/login'>
                  <LinkStyled>Efetuar Login</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
