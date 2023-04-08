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

    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    {
      sectionTitle: 'Artigos'
    },
    {
      title: 'Criar Artigo',
      icon: FormatLetterCase,
      path: '/typography'
    },

    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
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
      path: '/form-layouts'
    },
    {
      title: 'Ir para Blog',
      icon: ArrowDownCircle,
      path: '/'
    }
  ]
}

export default navigation
