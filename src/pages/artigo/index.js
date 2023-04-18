// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ArtigoBlog from 'src/views/artigo/ArtigoBlog'

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ArtigoBlog />
      </Grid>
      {/* <Grid item xs={12}>
        <TypographyTexts />
      </Grid> */}
    </Grid>
  )
}

export default TypographyPage
