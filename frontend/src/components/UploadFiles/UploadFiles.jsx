import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';
// import { Container, FormControl, InputGroup, Button } from 'react-bootstrap';
import { TextField, Box, Button, Paper } from '@mui/material';

import { useAirlineIdentifier } from '@api';
import { AutoComplete } from '@components';

import './UploadFiles.css';
import { fetchUser } from '../../Auth';

/**
 *
 * @return {Component}
 */
function UploadFiles({ title }) {
  // const [selectedFiles, setSelectedFiles] = React.useState(undefined);
  const airlineIdentifier = useAirlineIdentifier();
  const [accepted, setAccepted] = React.useState([]);
  const [rejected, setRejected] = React.useState([]);
  const [name, setName] = React.useState(process.env.REACT_APP_DEFAULT_PILOT ?? '');
  const [airline, setAirline] = React.useState(process.env.REACT_APP_DEFAULT_AIRLINE ?? null);
  // const [fileInfos, setFileInfos] = React.useState([]);

  const uploadFiles = async () => {
    let url = '';
    if (airline.includes('North Dakota')) {
      url = '/imports/und';
    } else if (airline.includes('SkyWest')) {
      url = '/imports/skywest';
    } else if (airline.includes('Delta')) {
      toast.error('Sorry this import isn\'t available yet!');
    }
    if (url != '') {
      const formData = new FormData();
      for (const a of accepted) {
        formData.append('files', a);
      }
      formData.append('User_id', fetchUser().id);
      formData.append('airline', airline);
      formData.append('name', name);
      await axios.post(url,
          formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((response) => {
            for (const [d, t] of response.data) {
              switch (t) {
                case 'success':
                  toast.success(d);
                  break;
                case 'warning':
                  toast.warning(d);
                  break;
                case 'error':
                  toast.error(d);
                  break;
              }
            }
            clear();
          }).catch((error) => {
            toast.error('Error uploading files');
            throw error;
          });
    }
  };

  const acceptedFiles = accepted.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const rejectedFiles = rejected.map(({ file, errors }) => {
    // console.log(file, errors);
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => {
            return <li key={e.code}>{e.message}</li>;
          })}
        </ul>
      </li>
    );
  },
  );

  const clear = () => {
    setAccepted([]);
    setRejected([]);
  };


  return (
    <>

      <Paper elevation={3}>
        <center><h2>{title}</h2></center>
        <center>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <AutoComplete
              label='Airline'
              name='AirlineIdentifier_id'
              data={airlineIdentifier.data}
              isLoading={airlineIdentifier.isLoading}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(e, data) => {
                // console.log('data', data);
                setAirline(data ? data.name: null);
              }}
              defaultValue={airline}
              // disabled
            />
            <TextField
              required
              label="Pilot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // disabled
            />
          </Box>
        </center>
        <div className="p-6 mb-4 bg-light rounded-4 ">
          <div className="container-fluid py-2 dropzone-container">
            <Dropzone
              onDropAccepted={(files) => {
                // console.log(files);
                setAccepted(accepted.concat(files));
              }}
              onDropRejected={(files) => setRejected(rejected.concat(files))}
              multiple={true} accept=".csv">
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag and Drop some files here, or click to select files</p>
                    <em>(Only *.csv files will be accepted)</em>
                  </div>
                  <aside>
                    <h4>Accepted Files</h4>
                    <ul>{acceptedFiles}</ul>
                    <h4>Rejected Files</h4>
                    <ul>{rejectedFiles}</ul>
                  </aside>
                  <div className='text-center'>
                    <Button
                      variant="contained"
                      color="success"
                      disabled={airline === null || name === '' || accepted.length === 0}
                      onClick={uploadFiles}
                    >
                    Upload
                    </Button>
                    {' '}
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={airline === null || name === '' || accepted.length === 0}
                      onClick={clear}
                    >
                    Clear
                    </Button>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
      </Paper>
    </>
  );
}
export default UploadFiles;

UploadFiles.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
};
