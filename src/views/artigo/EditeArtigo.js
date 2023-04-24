/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-no-undef */
// ** MUI Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { Button, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const DemoGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

export const schema = yup.object({
  Id: yup.number(),
  Titulo: yup.string()
    .min(5, 'O título deve conter, no mínimo, 5 caracteres')
    .max(100, 'O título deve conter, no máximo, 150 caracteres')
    .required('O título é obrigatório'),
  SubTitulo: yup.string()
    .min(5, 'O subtítulo deve conter, no mínimo, 5 caracteres')
    .max(150, 'O subtítulo deve conter, no máximo, 150 caracteres')
    .required('O subtítulo é obrigatória'),
  Texto: yup.string()
    .min(50, 'O artigo deve conter, no mínimo, 50 caracteres')
    .required('O artigo é obrigatória'),
  UrlImg: yup.string(),
  UsuarioID: yup.number(),
  publicado: yup.bool(),
  DataCadastro: yup.date(),
}).required();

const EditeArtigo = ({ editeArtigo }) => {

  const [isChecked, setIsChecked] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);

  useEffect(() => {
    if (editeArtigo.publicado !== null) {
      setIsChecked(editeArtigo.publicado);
    }
  }, [editeArtigo.publicado]);

  const handlePublicadoChange = (id, event) => {
    setIsChecked(!isChecked);
    const publicado = event.target.checked;
    updatePublicado(id, publicado);
  };

  const updatePublicado = (id, publicado) => {
    fetch(`/api/artigo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publicado: publicado,
        texto: editeArtigo.texto,
        titulo: editeArtigo.titulo,
        subtitulo: editeArtigo.subTitulo,
        usuarioID: editeArtigo.usuarioID,
        id: editeArtigo.id,
        dataCadastro: editeArtigo.dataCadastro,
        urlImg: editeArtigo.urlImg
      })
    })
      .then(response => response.json())
      .then(data => {
        // Atualiza o valor do campo publicado na tabela
        setRows(rows => {
          const index = rows.findIndex(row => row.id === id);
          if (index !== -1) {
            const newRow = { ...rows[index], publicado: publicado };

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
    const url = `/api/artigo/${editeArtigo.id}`;
    var args = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
    window.location.reload();
  }

  return (
    <Card>
      <CardHeader title='Artigo' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Título</Typography>
            </Grid>
            <DemoGrid item xs={12} sm={10}>
              <TextField
                type="text"
                className="form-control"
                {...register("Titulo")}
                fullWidth
                label="Título"
                id="fullWidth"
                defaultValue={editeArtigo.titulo} />
              <span className='text-danger'>{errors.Titulo?.message}</span>
              <Typography variant='body2'>Insira um título</Typography>
            </DemoGrid>

            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Subtítulo</Typography>
            </Grid>
            <DemoGrid item xs={12} sm={10}>
              <TextField
                className="form-control"
                {...register("SubTitulo")}
                fullWidth
                label="Subtítulo"
                id="fullWidth"
                defaultValue={editeArtigo.subTitulo} />
              <span className='text-danger'>{errors.SubTitulo?.message}</span>
              <Typography variant='body2'>Insira um subtítulo</Typography>
            </DemoGrid>

            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Artigo</Typography>
            </Grid>
            <DemoGrid item xs={12} sm={10}>
              <TextField
                className="form-control"
                {...register("Texto")}
                fullWidth
                id="outlined-multiline-static"
                label="Artigo"
                multiline
                rows={12}
                defaultValue={editeArtigo.texto}
              />
              <span className='text-danger'>{errors.Texto?.message}</span>
              <Typography variant='body2'>Escreva um artigo</Typography>
            </DemoGrid>
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Imagem URL</Typography>
            </Grid>
            <DemoGrid item xs={12} sm={10}>
              <TextField
                className="form-control"
                {...register("UrlImg")}
                fullWidth
                label="Imagem URL"
                id="fullWidth"
                defaultValue={editeArtigo.urlImg}
              />
              <span className='text-danger'>{errors.UrlImg?.message}</span>
              <Typography variant='body2'>Insira um Url de Imagem</Typography>
            </DemoGrid>
          </Grid>
          <input type="text" name="" value={editeArtigo.id}  {...register("Id")} hidden />
          <input type="text" name="" value={editeArtigo.usuario.id}  {...register("UsuarioID")} hidden />
          <input type="text" name="" value={editeArtigo.publicado}  {...register("publicado")} hidden />
          <input type="dateTime" name="" value={editeArtigo.dataCadastro}  {...register("DataCadastro")} hidden />
          <br />
          <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              variant='contained'
              endIcon={<Icon icon='mdi:send' />}
              type="submit"
              label="Salvar"
              onClick={() => setAlertStatus(!alertStatus)}
            />
            <Typography>Publicar</Typography>
            <FormGroup row>
              <FormControlLabel control={<Switch checked={isChecked} />} onChange={(event) => handlePublicadoChange(editeArtigo.id, event)} />
            </FormGroup>
            <Button>
              <Fab color='error' aria-label='edit'>
                <Icon icon="material-symbols:delete-outline-sharp" width="32" />
              </Fab>
            </Button>
          </Grid>
          {alertStatus &&
            <Alert variant='filled' severity='success'>
              <p className='alerta'>Dados salvos com sucesso!</p>
            </Alert>
          }
        </form>
      </CardContent>
    </Card>
  )
}

export default EditeArtigo
