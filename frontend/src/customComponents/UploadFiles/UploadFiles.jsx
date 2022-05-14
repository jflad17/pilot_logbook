import React from 'react';
import { Container, FormControl, InputGroup, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import './UploadFiles.css';

/**
 *
 * @return {Component}
 * @param {type} type
 */
function UploadFiles(type) {
  // const [selectedFiles, setSelectedFiles] = React.useState(undefined);
  const [accepted, setAccepted] = React.useState([]);
  const [rejected, setRejected] = React.useState([]);
  const [message, setMessage] = React.useState([]);
  const [name, setName] = React.useState('');

  // const [fileInfos, setFileInfos] = React.useState([]);

  const uploadFiles = () => {
    if (type === 'skywest') {
      console.log(accepted);
      // axios.post('/flight/skywest-import/');
    }
    console.log(message);
    setMessage([]);
  };

  const acceptedFiles = accepted.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const rejectedFiles = rejected.map(({ file, errors }) => {
    console.log(file, errors);
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
    setName('');
    setMessage('');
  };


  return (
    <>
      <Container className="mt-3">
        <center>
          <InputGroup className="mb-3 pilotName">
            <InputGroup.Text id="basic-addon1">Pilot Name</InputGroup.Text>
            <FormControl
              placeholder="Pilot Name"
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </center>
        <div className="p-6 mb-4 bg-light rounded-4 opacity-75 ">
          <div className="container-fluid py-2 dropzone-container">
            <Dropzone
              onDropAccepted={(files) => setAccepted(accepted.concat(files))}
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
                      variant="success"
                      className="opacity-100"
                      disabled={name === '' || accepted.length === 0}
                      onClick={uploadFiles}
                    >
                    Upload
                    </Button>
                    {' '}
                    <Button
                      variant="secondary"
                      className="opacity-100"
                      disabled={name === '' || accepted.length === 0}
                      onClick={clear}
                    >
                    Clear
                    </Button>
                  </div>
                  <div>
                    {message}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
        {message && message.length > 0 && (
          <div className="alert alert-secondary" role="alert">
            <ul>
              {message.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}
      </Container>
    </>
  );
}
export default UploadFiles;
