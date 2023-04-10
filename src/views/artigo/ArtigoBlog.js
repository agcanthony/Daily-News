/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-no-undef */
// ** MUI Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import BusyButton from '../../layouts/components/BusyButton';

const DemoGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

export const schema = yup.object({
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
    .required('O artigo é obrigatória')
}).required();

const ArtigoBlog = () => {
  const [busy, setBusy] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    setBusy(true);
    const url = '/api/artigo';
    var args = {
      method: 'POST',
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
          handleClose();
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
                id="fullWidth" />
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
                id="fullWidth" />
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
              />
              <span className='text-danger'>{errors.Texto?.message}</span>
              <Typography variant='body2'>escreva um artigo</Typography>
            </DemoGrid>
          </Grid>
          <BusyButton 
            type="submit"
            label="Salvar"
            busy={busy}
          />
        </form>
      </CardContent>
    </Card>
  )
}

export default ArtigoBlog
