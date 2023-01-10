import { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../services/api';
import Header from '../components/Header';
import { InputAdornment, TextField } from '@mui/material';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

function CatPage() {
  const [searchTerm, setSearchTerm] = useState("");
  let [url, setUrl] = useState('');

  const search = (statusCode: string) => {
    const newCatUrl = "https://http.cat/" + statusCode;
    setUrl(newCatUrl);
  };


  useEffect(() => {
    search(searchTerm);
  }, [searchTerm]);

  return (
    <div>
    <Header/>
    <br/><br/><br/><br/><br/>
    <br/><br/>
    <div className='cat-page'>
    <TextField
    variant="standard"
    label={<p><img width={30} src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/openmoji/338/cat_1f408.png'></img>Test a number Cat</p>}
    id="input-with-icon-textfield"
    style={{width: 500}}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <ScatterPlotIcon />
        </InputAdornment>
      ),
    }}
    type="text"
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
      />
     {searchTerm.length > 0 ? <img width={500} src={url} alt="cat"></img> : undefined}
     <img width={300} src='https://raw.githubusercontent.com/KaminskiFking/KaminskiFking.github.io/main/Playful%20cat%20(1).gif'></img>
     </div>
    </div>
  );
}

export default CatPage;