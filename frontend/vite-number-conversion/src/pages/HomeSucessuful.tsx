import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';

import { ReactContext } from '../context/ReactContext';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Container, Grid, Pagination, TablePagination } from '@mui/material';


function HomeSucessuful() {
  const [data, setData]: any = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://randomuser.me/api/?results=50');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(data.results) {
    setCurrentPage(1);
    setFilteredData(
      data.results.filter((item: any) =>
        `${item.name.first} ${item.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    }
  }, [searchTerm, data]);

  useEffect(() => {
    if(data.results){
    setCurrentPage(1);
    setFilteredData(
      data.results.filter((item: any) =>
        `${item.email} ${item.email}`.toLowerCase().includes(searchEmail.toLowerCase())
      )
    );
    }
  }, [searchEmail, data]);

  useEffect(() => {
    if(data.results){
    setCurrentPage(1);
    setFilteredData(
      data.results.filter((item: any) =>
        `${item.login.username} ${item.login.username}`.toLowerCase().includes(searchUsername.toLowerCase())
      )
    );
    }
  }, [searchUsername, data]);

  const elementsPerpage = 9;
  const totalPages = Math.ceil(filteredData.length /  elementsPerpage)
  const currentPageData = filteredData.slice((currentPage - 1) * elementsPerpage, currentPage * elementsPerpage) ;
  const handlePageChange =  (_event: any, page: number) => {
    setCurrentPage(page);
  }


  return (
    <Grid container spacing={20}>
    <Grid container item spacing={1}>
    <Header />
    </Grid>
    <Grid container item spacing={1}>
    <Container sx={{ display: 'flex', gap: 10, marginLeft: 20 }}>
    <TextField
        id="input-with-icon-textfield"
        label="Name Field"
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <InsertEmoticonIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    <TextField
        id="input-with-icon-textfield"
        label="Email Field"
        type="email"
        value={searchEmail}
        onChange={e => setSearchEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        id="input-with-icon-textfield"
        label="Username Field"
        type="text"
        value={searchUsername}
        onChange={e => setSearchUsername(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      </Container>
      </Grid>
      <Grid container item spacing={13}>
    <div className="table-div">
      <TableContainer component={Paper}>
      <Table className='table-form'>
        <TableHead>
          <TableRow >
            <p></p>
            <TableCell style={ { color: 'black', fontWeight: 'bold', fontFamily: 'Arial',} } align="center">Name</TableCell>
            <TableCell style={ { color: 'black', fontWeight: 'bold', fontFamily: 'Arial',} } align="center">email</TableCell>
            <TableCell style={ { color: 'black', fontWeight: 'bold', fontFamily: 'Arial',} } align="center">username</TableCell>
            <TableCell style={ { color: 'black', fontWeight: 'bold', fontFamily: 'Arial',} } align="center">idade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody aria-label="customized table" >
          {filteredData && currentPageData.map((item: any) => (
            <TableRow key={item.email}>
              <Avatar alt={item.email} sx={{ width: 56, height: 56 }} src={item.picture.large} />
              <TableCell  style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} } align="center">
                {item.name.first} {item.name.last}
              </TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="center">{item.email}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="center">{item.login.username}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} } align="center">{item.dob.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
    </div>
    </Grid>
    </Grid>
  )
};


export default HomeSucessuful;
