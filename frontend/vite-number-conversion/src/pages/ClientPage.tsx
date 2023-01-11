import { useContext, useEffect, useState } from 'react';
import { message } from 'antd';
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
import { ReactContext } from '../context/ReactContext';
import { api } from '../services/api';

const ClientPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCpf] = useState('');
  const [edit, setEdit] = useState(false);
  const [clients, setClients] = useState([]);
  const { user } = useContext(ReactContext);
  const [_id, setId]: any = useState('');
  const [open, setOpen] = useState(false);


  async function handleSubmit() {
    try {
      await api.put(`clients/${_id}`, {name,
        email,
        telephone,
        address,
        cpf}, {
          headers: {
            Authorization: user,
          },
        });
      setOpen(false);
      message.success('Cliente atualizado com sucesso!');

    } catch (error) {
      message.error('Erro ao atualizar cliente, tente novamente.');
    }
  }


  async function deleteClient(id: any) {
    try {
      await api.delete(`clients/${id}`, {
        headers: {
          Authorization: user,
        },
      })
      message.success('Cliente deletado com sucesso');

    } catch (error) {
      message.error('Erro ao deletar cliente, tente novamente.');
    }
  }

  async function registerClient(e: any) {
    e.preventDefault();
    try {
      await api.post('clients', {
        name,
        email,
        telephone,
        address,
        cpf
      }, {
        headers: {
          Authorization: user,
        }
      });

      message.success('Cliente Cadastrado');

    } catch (error) {
      message.error('Erro ao cadastrar usuário, verifique os campos e tente novamente');
    }
  }

  async function getAllClients() {
    const clientsAll = await api.get('clients', 
      {
        headers: {
          Authorization: user,
        },
      },
  );
    const { data } = clientsAll;
    setClients(data.message);
  }

  useEffect(() => {
    getAllClients();
  }, [clients]);

  useEffect(() => {
    getAllClients();
  }, [registerClient]);

  const handleEditUpdate = (id: string) => {
    setOpen(!open);
    setEdit(true);
    setId(id)
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
      <form className="form-clients">
      <TextField
        type='text'
        name='name'
        id="input-with-icon-textfield"
        label="Name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
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
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
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
        value={cpf}
        onChange={(e: any) => setCpf(e.target.value)}
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
        value={telephone}
        onChange={(e: any) => setTelephone(e.target.value)}
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
        value={address}
        onChange={(e: any) => setAddress(e.target.value)}
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
        <Button variant="contained" onClick={registerClient} color="primary" type="button">Add Customer</Button>
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
          {clients && clients.map((item: any) => (
            <TableRow key={item.email}>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.name}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.email}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.cpf}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.telephone}</TableCell>
              <TableCell style={ { color: 'black', fontWeight: 'lighter', fontFamily: 'Times New Roman',} }align="left">{item.address}</TableCell>
              <TableCell> <Button onClick={() => handleEditUpdate(item._id)}><CreateIcon color="success" /></Button> </TableCell>
              <TableCell> <Button onClick={() => deleteClient(item._id)}><DeleteForeverIcon  color="error"/></Button> </TableCell>
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
        <form style={{display: 'flex', flexDirection: 'column', width: 400}}>
        <TextField
        type='text'
        name='name'
        id="input-with-icon-textfield"
        label="Name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
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
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
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
        value={cpf}
        onChange={(e: any) => setCpf(e.target.value)}
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
        value={telephone}
        onChange={(e: any) => setTelephone(e.target.value)}
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
        value={address}
        onChange={(e: any) => setAddress(e.target.value)}
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
        <Button variant="contained" color="primary" onClick={handleSubmit} type="button">Edit Customer</Button>
        </ThemeProvider>
        </form>
        </TableContainer>
        </Backdrop>
      )}
    </div>
  );
};

export default ClientPage;