import { useState } from 'react';
import axiosApi from './axiosApi';
import Appbar from './components/Appbar/Appbar';
import { DecodedMsg, EncodedMsg, Message } from './types';
import { Box, Container, IconButton, TextField, Tooltip } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

function App() {
  const [decodedMsg, setDecodedMsg] = useState('');
  const [password, setPassword] = useState('');
  const [encodedMsg, setEncodedMsg] = useState('');
  const [pwdError, setPwdError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case 'decoded':
        setDecodedMsg(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'encoded':
        setEncodedMsg(e.target.value);
        break;
    }
  };

  const getEncodedMsg = async () => {
    if (!(password.length > 0)) {
      setPwdError(true);
      return;
    }
    const data: Message = {
      password: password,
      message: decodedMsg,
    };
    const { data: message } = await axiosApi.post<EncodedMsg>('/encode', data);
    setEncodedMsg(message.encoded);
    setPwdError(false);
  };

  const getDecodedMsg = async () => {
    if (!(password.length > 0)) {
      setPwdError(true);
      return;
    }
    const data: Message = {
      password: password,
      message: encodedMsg,
    };
    const { data: message } = await axiosApi.post<DecodedMsg>('/decode', data);
    setDecodedMsg(message.decoded);
    setPwdError(false);
  };

  return (
    <>
      <Appbar />
      <Container>
        <Box pt={4}>
          <TextField
            fullWidth
            name='decoded'
            id='decoded'
            multiline
            rows={4}
            label='Decoded message'
            margin='normal'
            value={decodedMsg}
            onChange={(e) => handleChange(e)}
          />
          <Box display='flex' alignItems='center' gap={1}>
            <TextField
              error={pwdError}
              name='password'
              id='password'
              label='password'
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <Tooltip title='Encrypt'>
              <IconButton
                children={<ArrowCircleDownIcon fontSize='inherit' />}
                size='large'
                color='primary'
                onClick={() => {
                  void getEncodedMsg();
                }}
              />
            </Tooltip>
            <Tooltip title='Decipher'>
              <IconButton
                children={<ArrowCircleUpIcon fontSize='inherit' />}
                size='large'
                color='primary'
                onClick={() => {
                  void getDecodedMsg();
                }}
              />
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            name='encoded'
            id='encoded'
            multiline
            rows={4}
            label='Encoded message'
            margin='normal'
            value={encodedMsg}
            onChange={(e) => handleChange(e)}
          />
        </Box>
      </Container>
    </>
  );
}

export default App;
