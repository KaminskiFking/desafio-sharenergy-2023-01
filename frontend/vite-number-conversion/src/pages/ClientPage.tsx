import ClientPageHooks from '../hooks/ClientPageHooks';
import { useState } from 'react';
import '@fontsource/roboto/500.css';
import Header from '../components/Header';
import { InputAdornment, 
  ThemeProvider, 
  Backdrop, Button, 
  createTheme, Paper, 
  Table, TableBody, 
  TableCell, TableContainer, 
  TableHead, TableRow, Typography, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ClientPage = () => {
  const [edit, setEdit] = useState(false);
  const [id, setId]: any = useState('');
  const { customers, addCustomer, updateCustomer, deleteCustomer } = ClientPageHooks();
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCustomer = (event: any) => {
    event.preventDefault();
    const { name, email, cpf, telephone, address } = event.target.elements;
    addCustomer({
      id: Date.now(),
      name: name.value,
      email: email.value,
      cpf: cpf.value,
      telephone: telephone.value,
      address: address.value
    });
  }

  const handleUpdateForm = (event: any) => {
    event.preventDefault();
    const { name, email, cpf, telephone, address } = event.target.elements;
    const updateCustomerForm = ({
      id: Date.now(),
      name: name.value,
      email: email.value,
      cpf: cpf.value,
      telephone: telephone.value,
      address: address.value
    });
    updateCustomer(id, updateCustomerForm)
    setEdit(false);
  }

  const handleEditUpdate = (id: number) => {
    setOpen(!open);
    setEdit(true);
    setId(id)
  }

  const handleDeleteCustomer = (id: number) => {
    deleteCustomer(id);
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#354f52',
      },
    },
  });

  return (
    <div>
      <Header/>
      <br/><br/><br/> <br/><br/>
      <div style={{display: 'flex', justifyContent: 'center', fontSize: 50, fontWeight: 'bolder', fontFamily: 'Monaco', color: "#2f3e46", backgroundColor: '#cad2c5', }}>
      <Typography style={{fontSize: 50,}}>Customer Management</Typography>
      </div>
      <br/><br/><br/><br/><br/>
      <div style={{display: 'flex', flexDirection: 'column', width: 1080, justifyContent: 'center', marginLeft: 408}}>
      <form onSubmit={handleAddCustomer} className="form-clients">
      <TextField
        type='text'
        name='name'
        id="input-with-icon-textfield"
        label="Name"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
        <TextField
        type='email'
        name='email'
        id="input-with-icon-textfield"
        label="Email"
        required
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
        type='text'
        name='cpf'
        id="input-with-icon-textfield"
        label="CPF"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ContactMailIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        type='text'
        name='telephone'
        id="input-with-icon-textfield"
        label="Telephone"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddIcCallIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        type='text'
        name='address'
        id="input-with-icon-textfield"
        label="Address"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
       <ThemeProvider theme={ theme }>
        <Button variant="contained" color="primary" type="submit">Add Customer</Button>
        </ThemeProvider>
      </form>
      <div>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={ { color: 'black', fontWeight: 'bold', fontFamily: 'Arial',} } align="left">Name</TableCell>
            <TableCell style={ { color: 'black', fontWeight: 'bold', fontFamily: 'Arial',} } align="left">Email</TableCell>
            <TableCell style={ { color: 'black', fontWeight: 'bold', fontFamily: 'Arial',} } align="left">CPF</TableCell>
            <TableCell style={ { color: 'black', fontWeight: 'bold', fontFamily: 'Arial',} } align="left">Telephone</TableCell>
            <TableCell style={ { color: 'black', fontWeight: 'bold', fontFamily: 'Arial',} } align="left">Address</TableCell>
            <TableCell style={ { color: 'green', fontWeight: 'bold', fontFamily: 'Arial',} } align="left">EDIT</TableCell>
            <TableCell style={ { color: 'red', fontWeight: 'bold', fontFamily: 'Arial',} } align="left">DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody aria-label="customized table" >
          {customers && customers.map((item: any) => (
            <TableRow key={item.email}>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.email}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.name}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.cpf}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.telephone}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.address}</TableCell>
              <TableCell> <Button onClick={() => handleEditUpdate(item.id)}><CreateIcon color="success" /></Button> </TableCell>
              <TableCell> <Button onClick={() => handleDeleteCustomer(item.id)}><DeleteForeverIcon  color="error"/></Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
      {edit && (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <TableContainer style={{display: 'flex', flexDirection: 'column', width: 400}} component={Paper}>
        <form style={{display: 'flex', flexDirection: 'column', width: 400}} onSubmit={handleUpdateForm}>
        <TextField
        type='text'
        name='name'
        id="input-with-icon-textfield"
        label="Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
        <TextField
        type='email'
        name='email'
        id="input-with-icon-textfield"
        label="Email"
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
        type='text'
        name='cpf'
        id="input-with-icon-textfield"
        label="CPF"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ContactMailIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        type='text'
        name='telephone'
        id="input-with-icon-textfield"
        label="Telephone"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddIcCallIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        type='text'
        name='address'
        id="input-with-icon-textfield"
        label="Address"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      /><ThemeProvider theme={ theme }>
        <Button variant="contained" color="primary" onClick={handleClose} type="submit">Edit Customer</Button>
        </ThemeProvider>
        </form>
        </TableContainer>
        </Backdrop>
      )}
    </div>
  );
};

export default ClientPage;