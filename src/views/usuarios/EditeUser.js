/* eslint-disable padding-line-between-statements */
// ** MUI Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Fab from '@mui/material/Fab'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

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
    Id: yup.number(),
    Nome: yup.string()
        .min(4, 'O Nome deve conter, no mínimo, 5 caracteres')
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
    CodigoConfirmacao: yup.string(),        
    TipoLoginID: yup.number()
        .required('O Tipo é obrigatória'),
}).required();


const EditeUser = ({ editeUsuario }) => {
    // const dataNascimento = new Date(editeUsuario.dataNascimento);
    // const dataFormatada = dataNascimento.toLocaleDateString('pt-BR');


    // ** States
    const [values, setValues] = useState({
        newPassword: editeUsuario.senha,
        currentPassword: '',
        showNewPassword: false,
        confirmNewPassword: '',
        showCurrentPassword: false,
        showConfirmNewPassword: false
    })

    // ** State
    const [openAlert, setOpenAlert] = useState(true)
    const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

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

    const [isChecked, setIsChecked] = useState(false);
    const [alertStatus, setAlertStatus] = useState(false);

    useEffect(() => {
        if (editeUsuario.ativo !== null) {
            setIsChecked(editeUsuario.ativo);
        }
    }, [editeUsuario.ativo]);

    const handleativoChange = (id, event) => {
        setIsChecked(ativo);
        const ativo = event.target.checked;
        updateativo(id, ativo);
    };

    const updateativo = (id, ativo) => {
        fetch(`/api/Usuario/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ativo: ativo,
                nome: editeUsuario.nome,
                email: editeUsuario.email,
                apelido: editeUsuario.apelido,
                id: id,
                senha: editeUsuario.senha,
                DataNascimento: editeUsuario.dataNascimento,
                CodigoConfirmacao: editeUsuario.codigoConfirmacao,
                TipoLoginID: editeUsuario.tipoLoginID
            })
        })
            .then(response => response.json())
            .then(data => {
                // Atualiza o valor do campo ativo na tabela
                setRows(rows => {
                    const index = rows.findIndex(row => row.id === id);
                    if (index !== -1) {
                        const newRow = { ...rows[index], ativo: ativo };

                        return [...rows.slice(0, index), newRow, ...rows.slice(index + 1)];
                    } else {
                        return rows;
                    }
                });
            })
            .catch(error => console.log(error));
    };


    const [busy, setBusy] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleSaveButtonClick = () => {
        setAlertStatus(true);
        onSubmit();
    };

    const onSubmit = (data) => {
        setBusy(true);
        const url = `/api/usuario/${editeUsuario.id}`;
        var args = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ativo: editeUsuario.ativo,
                nome: editeUsuario.nome,
                email: editeUsuario.email,
                apelido: editeUsuario.apelido,
                id: editeUsuario.id,
                senha: editeUsuario.senha,
                DataNascimento: editeUsuario.dataNascimento,
                CodigoConfirmacao: editeUsuario.codigoConfirmacao,
                TipoLoginID: editeUsuario.tipoLoginID
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

    }

    const onSubmit2 = (data) => {
        setBusy(true);
        const url = `/api/Usuario/${editeUsuario.id}`;
        var args = {
            method: 'DELETE'
        };
        fetch(url, args).then((result) => {
            result.text().then((resultData) => {
                if (result.status == 200) {
                    window.location.reload();

                }
                else {
                    let errorMessage = '';
                    if (resultData.errors != null) {
                        const totalErros = Object.keys(resultData.errors).length;

                        for (var i = 0; i < totalErros; i++)
                            errorMessage = errorMessage + Object.values(resultData.errors)[i] + "<br/>";
                    }
                    else
                        errorMessage = resultData;
                }
            });
        });
    }

    return (
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={7}>
                    <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ImgStyled src={imgSrc} alt='Profile Pic' />
                            <Box>
                                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                                    Upload Foto
                                    <input
                                        hidden
                                        type='file'
                                        onChange={onChange}
                                        accept='image/png, image/jpeg'
                                        id='account-settings-upload-image'
                                    />
                                </ButtonStyled>
                                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                                    Reset
                                </ResetButtonStyled>
                                <Typography variant='body2' sx={{ marginTop: 5 }}>
                                    PNG ou JPEG permitido.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label='Nome'
                            placeholder='johnDoe'
                            {...register("Nome")}
                            defaultValue={editeUsuario.nome} />
                        <span className='text-danger'>{errors.Nome?.message}</span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label='Apelido'
                            placeholder='John Doe'
                            {...register("Apelido")}
                            defaultValue={editeUsuario.apelido}
                        />
                        <span className='text-danger'>{errors.Apelido?.message}</span>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            fullWidth
                            label='Data Nascimento'
                            placeholder='Data Nascimento'
                            {...register("DataNascimento")}
                            defaultValue={dataFormatada} />
                        <span className='text-danger'>{errors.DataNascimento?.message}</span>
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type='email'
                            label='Email'
                            {...register("Email")}
                            defaultValue={editeUsuario.email}
                            placeholder='johnDoe@example.com'
                        />
                        <span className='text-danger'>{errors.Email?.message}</span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo</InputLabel>
                            <Select label='Tipo' defaultValue={editeUsuario.tipoLoginID} {...register("TipoLoginID")}>
                                <MenuItem value='1'>Admin</MenuItem>
                                <MenuItem value='2'>Autor</MenuItem>
                                <MenuItem value='3'>Leitor</MenuItem>
                            </Select>
                        </FormControl>
                        <span className='text-danger'>{errors.TipoLoginID?.message}</span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select label='Status' defaultValue={editeUsuario.ativo} {...register("Ativo")}>
                                <MenuItem value='false'>Bloqueado</MenuItem>
                                <MenuItem value='true'>Não Bloqueado</MenuItem>
                            </Select>
                        </FormControl>
                        <span className='text-danger'>{errors.Ativo?.message}</span>
                    </Grid>
                    <Grid item xs={6} sm={{ marginTop: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                            <OutlinedInput
                                label='Insira a senha!'
                                value={values.newPassword}
                                defaultValue={editeUsuario.senha}
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

                    <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button
                            variant='contained'
                            sx={{ marginRight: 3.5 }}
                            endIcon={<Icon icon='mdi:send' />}
                            type="submit"
                            label="Salvar"
                            onClick={() => setAlertStatus(!alertStatus)}
                        >Salvar </Button>
                        {/* <FormGroup row>
                            <FormControlLabel control={<Switch checked={isChecked} />} onChange={(event) => handleativoChange(editeUsuario.id, event)} />
                        </FormGroup> */}
                        <Button>
                            <Fab color='error' aria-label='edit'>
                                <Icon icon="material-symbols:delete-outline-sharp" width="32" onClick={onSubmit2} />
                            </Fab>
                        </Button>
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

export default EditeUser;
