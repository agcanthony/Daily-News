// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks
  const theme = useTheme()

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
            <svg xmlns="http://www.w3.org/2000/svg" id="Camada_1" data-name="Camada 1" viewBox="0 0 190.76 354.71" width="32" height="32">
              <path fill={theme.palette.primary.main} d="m97.09,354.71h0c51.73,0,93.67-41.94,93.67-93.67v-33.39c0,.52-.42.94-.94.94h-60.6c-3.45,0-6.25-2.8-6.25-6.25v-.03c0-3.5,2.83-6.33,6.33-6.33h60.52c.52,0,.94.42.94.94v-27.1c0,.52-.42.94-.94.94h-60.6c-3.45,0-6.25-2.8-6.25-6.25v-.03c0-3.5,2.83-6.33,6.33-6.33h60.52c.52,0,.94.42.94.94v-27.1c0,.52-.42.94-.94.94h-60.6c-3.45,0-6.25-2.8-6.25-6.25v-.03c0-3.5,2.83-6.33,6.33-6.33h60.52c.52,0,.94.42.94.94v-27.1c0,.52-.42.94-.94.94h-60.6c-3.45,0-6.25-2.8-6.25-6.25v-.03c0-3.5,2.83-6.33,6.33-6.33h60.52c.52,0,.94.42.94.94v-9.22C190.76,42.17,148.59,0,96.56,0h0C43.23,0,0,43.23,0,96.56v6.84c0-.52.42-.94.94-.94h60.6c3.45,0,6.25,2.8,6.25,6.25v.03c0,3.5-2.83,6.33-6.33,6.33H.94c-.52,0-.94-.42-.94-.94v27.1c0-.52.42-.94.94-.94h60.6c3.45,0,6.25,2.8,6.25,6.25v.03c0,3.5-2.83,6.33-6.33,6.33H.94c-.52,0-.94-.42-.94-.94v27.1c0-.52.42-.94.94-.94h60.6c3.45,0,6.25,2.8,6.25,6.25v.03c0,3.5-2.83,6.33-6.33,6.33H.94c-.52,0-.94-.42-.94-.94v27.1c0-.52.42-.94.94-.94h60.6c3.45,0,6.25,2.8,6.25,6.25v.03c0,3.5-2.83,6.33-6.33,6.33H.94c-.52,0-.94-.42-.94-.94v29.97c0,53.62,43.47,97.09,97.09,97.09Z"/>
            </svg>
            <HeaderTitle variant='h6' sx={{ ml: 3 }}>
              {themeConfig.templateName}
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
