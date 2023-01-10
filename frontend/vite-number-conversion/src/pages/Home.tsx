import { Button, Checkbox, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { ReactContext } from '../context/ReactContext';

function Home() {
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState('');
  const { SignIn, signed } = useContext(ReactContext);
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('password',  JSON.stringify(password));
    SignIn(data);
  };

  const handleRememberMe = () => {
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('rememberMe', JSON.stringify(remember));
    localStorage.setItem('password',  JSON.stringify(password));
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#D9F342',
      },
    },
  });

  const rememberMeVerify = () => {
    localStorage.setItem('rememberMe', JSON.stringify(remember));
  }
  console.log(remember);

  useEffect(() => {
    const rememberValue = JSON.parse(localStorage.getItem('rememberMe') as string);
    if (rememberValue) {
      setRemember(true)
      const userValue = JSON.parse(localStorage.getItem('username') as string);
      setUsername(userValue);
      const userPassword = JSON.parse(localStorage.getItem('password') as string);
      setPassword(userPassword);
    } else {
      localStorage.removeItem('password');
      localStorage.removeItem('username');
    }
  }, []);

  if(signed){
    return <Navigate to="/Home"/>;
  } else {
  return (
    <div className='box-login' >
      <img width={800} height={500} src='https://scontent.fcgh39-1.fna.fbcdn.net/v/t39.30808-6/299600233_498798462251115_7622805956717209051_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=FLZgXpAZe1IAX8wMyy-&tn=be6yy0HNx_tqEEwb&_nc_ht=scontent.fcgh39-1.fna&oh=00_AfCUaadxDijBzfJ-uWkmr_A1xF0IgDw7dne2AWhMC50_iA&oe=63C1E49E'></img>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 500,
      height: 500,
      backgroundColor: '#2a9d8f',
    }}>
    <ThemeProvider theme={ theme }>
    <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} onSubmit={handleSubmit}>
      <label htmlFor="text">
        <TextField
          id="input-with-icon-textfield"
          label="Name"
          type="text"
          name="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br/>
      <br/>
      <label htmlFor="password">
        <TextField
          id="input-with-icon-textfield"
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br/>
      <br/>
      <label>
      Remember password:
      <Checkbox typeof='checkbox' checked={remember} onChange={(e) => setRemember(e.target.checked)} />
      </label>
      <Button
        sx={{width: 200 }}
        type="submit"
        variant="contained" 
        color="primary"
        onClick={remember ? handleRememberMe : rememberMeVerify}
      >
        Entrar
      </Button>
    </form>
    </ThemeProvider>
    </Box>
    </div>
  );
  }
}

export default Home;
