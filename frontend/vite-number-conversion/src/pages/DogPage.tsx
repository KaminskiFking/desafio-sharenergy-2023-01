import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

function DogPage() {
  const [imageUrl, setImageUrl] = useState('');


  const handleClickDog = () => {
    fetch('https://random.dog/woof.json')
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.url);
      });
    }

  useEffect(() => {
    handleClickDog();
  }, []);

  useEffect(() => {
    checkFormat();
  }, [imageUrl]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#354f52',
      },
    },
  });

  const checkFormat = () => {
    const urlSeparate = imageUrl.toLowerCase().split('.');
    if(urlSeparate[2] === 'png' || urlSeparate[2] === 'jpg' || urlSeparate[2] === 'jpeg' ||  urlSeparate[2] === 'gif'){
      return (
        <img src={imageUrl} alt="A random dog" />
      )
    }
    if(urlSeparate[2] === 'mp4') {
      return (
        <video src={imageUrl} controls autoPlay />
      )
    }
  }

  return (
    <div>
    <Header/>
    <div className="dogpage">
    <br/><br/><br/><br/><br/>
    <ThemeProvider theme={ theme }>
    <Button
      type="button"
      variant="contained" 
      color="primary"
          onClick={ handleClickDog }
        >
          Another Dog
    </Button>
    </ThemeProvider>
    {checkFormat()}
    </div>
    </div>
  );
}

export default DogPage;