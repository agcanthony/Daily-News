/* eslint-disable import/newline-after-import */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditeUser from '../usuarios/EditeUser';
const MySwal = withReactContent(Swal);


const ListaUsuario = () => {

  const [open, setOpen] = useState(false)

  // const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)    
  };

  const [selectedId, setSelectedId] = useState(null); // Adicionar o estado para armazenar o id selecionado

  const handleClickOpen = (id) => {

    setSelectedId(id);
    setOpen(true);
  };

  const statusObj = {
    false: { color: 'error' },
    true: { color: 'success' },
    current: { color: 'primary' },
    resigned: { color: 'warning' },
    professional: { color: 'success' }
  }

  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    fetch('/api/usuario')
      .then(response => response.json())
      .then(data => setRows(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Apelido</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.tipoLogin.descricao}</TableCell>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.apelido}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.ativo ? 'Não Bloqueado' : 'Bloqueado'}
                      color={statusObj[row.ativo].color}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button sx={{ height: '30px', width: '8px' }} onClick={() => handleClickOpen(row.id)}>
                      <VisibilityIcon sx={{ height: '32px', width: '32px' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <div>
        <Dialog maxWidth={'lg'} onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
          <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
            >
              <Fragment>
                <div className='demo-space-x'>
                  <Fab color='error' aria-label='add' size='small'>
                    X
                  </Fab>
                </div>
              </Fragment>
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 4 }}>
            <EditeUser editeUsuario={rows.find((row) => row.id === selectedId)} />
          </DialogContent>
        </Dialog>
      </div >
    </>
  )
}

export default ListaUsuario;
