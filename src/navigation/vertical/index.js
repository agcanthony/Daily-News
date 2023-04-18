// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ArrowDownCircle from 'mdi-material-ui/light/ArrowDownCircle'

const navigation = () => {
  return [
    {
      title: 'Início',
      icon: HomeOutline,
      path: '/pages/home/'
    },
    {
      sectionTitle: 'Artigos'
    },
    {
      title: 'Criar Artigo',
      icon: FormatLetterCase,
      path: '/artigo'
    },
    {
      sectionTitle: 'Config'
    },
    {
      title: 'Cadastro Autores',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      icon: CubeOutline,
      title: 'Usuarios',
      path: '/user-layouts'
    },
    {
      title: 'Ir para Blog',
      icon: ArrowDownCircle,
      path: '/'
    }
  ]
}

export default navigation
