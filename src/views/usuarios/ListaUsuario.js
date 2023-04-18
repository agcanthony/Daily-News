/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


const ListaUsuario = () => {
  const statusObj = {
    true: { color: 'error' },
    false: { color: 'success' },
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
      .then(data => {
        console.log(data)
        setRows(data)})      
      .catch(error => console.log(error));
  }, []);

  return (
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
              <TableCell>Ver</TableCell> 
              <TableCell>Remover</TableCell>             
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
                <TableCell></TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.apelido}</TableCell>
                <TableCell>{row.email}</TableCell>           
                <TableCell>
                <Chip
                    label={row.bloquear ? 'Bloqueado' : 'Não Bloqueado'}
                    color={statusObj[row.bloquear].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button>X</Button>
                </TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Card>
  )
}

export default ListaUsuario;
