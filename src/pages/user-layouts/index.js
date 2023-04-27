/* eslint-disable react/jsx-no-undef */
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import ListaUsuario from 'src/views/usuarios/ListaUsuario'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const UserLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <ListaUsuario />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default UserLayouts
