/* eslint-disable padding-line-between-statements */
// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { useForm } from "react-hook-form"
import * as yup from "yup"

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

export const schema = yup.object({
  Nome: yup.string()
    .min(5, 'O Nome deve conter, no mínimo, 5 caracteres')
    .max(100, 'O Nome deve conter, no máximo, 150 caracteres')
    .required('O Nome é obrigatório'),
  Email: yup.string()
    .min(5, 'O Email deve conter, no mínimo, 5 caracteres')
    .max(150, 'O Email deve conter, no máximo, 150 caracteres')
    .required('O Email é obrigatória'),
  Apelido: yup.string()
    .min(3, 'O Apelido deve conter, no mínimo, 50 caracteres')
    .required('O Apelido é obrigatória'),
  Senha: yup.string(),
  DataNascimento: yup.date()
    .required('A data é obrigatória'),
  ativo: yup.bool()
    .required('O Status é obrigatória'),
  TipoLoginID: yup.number()
    .required('O Tipo é obrigatória'),
}).required();

const TabAccount = () => {

  const [busy, setBusy] = useState(false);

  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [alertStatus, setAlertStatus] = useState(false);
  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }


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
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY
      },
      body: JSON.stringify({
        ...data,
        CodigoConfirmacao: '1',
        ativo: true
      })
    };

    fetch(url, args).then((result) => {
      result.json().then((resultData) => {
        setBusy(false);
        if (result.status == 200) {
          //ações em caso de sucesso
          // messageCallback({ tipo: 'sucesso', texto: resultData });
          // console.log(resultData);
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

          // messageCallback({ tipo: 'erro', texto: errorMessage });
        }
      }
      )
    });

    // window.location.reload();
  }


  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />             
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nome'
              placeholder='johnDoe'
              {...register("Nome")} />
            <span className='text-danger'>{errors.Nome?.message}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Apelido'
              placeholder='John Doe'
              {...register("Apelido")}
            />
            <span className='text-danger'>{errors.Apelido?.message}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              fullWidth
              label='Data Nascimento'
              placeholder='Data Nascimento'
              {...register("DataNascimento")} />
            <span className='text-danger'>{errors.DataNascimento?.message}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              {...register("Email")}
              placeholder='johnDoe@example.com'
            />
            <span className='text-danger'>{errors.Email?.message}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select label='Tipo'  {...register("TipoLoginID")}>
                <MenuItem value='1'>Admin</MenuItem>
                <MenuItem value='2'>Autor</MenuItem>
                <MenuItem value='3'>Leitor</MenuItem>
              </Select>
            </FormControl>
            <span className='text-danger'>{errors.TipoLoginID?.message}</span>
          </Grid>
          <Grid item xs={6} sm={{ marginTop: 6 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
              <OutlinedInput
                label='Insira a senha!'
                value={values.newPassword}
                {...register("Senha")}
                id='account-settings-new-password'
                onChange={handleNewPasswordChange('newPassword')}
                type={values.showNewPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowNewPassword}
                      aria-label='toggle password visibility'
                      onMouseDown={handleMouseDownNewPassword}
                    >
                      {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <span className='text-danger'>{errors.Senha?.message}</span>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant='contained'
              sx={{ marginRight: 3.5 }}
              endIcon={<Icon icon='mdi:send' />}
              type="submit"
              label="Salvar"
              onClick={() => setAlertStatus(!alertStatus)}
            >Salvar </Button>

          </Grid>
        </Grid>
        <br />
        {alertStatus &&
          <Alert variant='filled' severity='success'>
            <p className='alerta'>Dados salvos com sucesso!</p>
          </Alert>
        }
      </form>
    </CardContent>
  )
}

export default TabAccount
