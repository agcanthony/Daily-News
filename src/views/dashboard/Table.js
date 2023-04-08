/* eslint-disable newline-before-return */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const DashboardTable = () => {
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMap, setUserMap] = useState({});
  
  useEffect(() => {
    fetch('/api/artigo')
      .then(response => response.json())
      .then(data => setRows(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch('/api/usuario')
      .then(response => response.json())
      .then(data => {        
        setUsers(data);
        setUserMap(data.reduce((map, user) => {
          map[user.id] = user.nome;
          return map;
        }, {}));
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Artigo</TableCell>
              <TableCell>subTitulo</TableCell>
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
                <TableCell>                                
                  {userMap[row.idUsuario] || 'Carregando...'}
                </TableCell>
                <TableCell>{row.titulo}</TableCell>
                <TableCell>{row.subTitulo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable;
