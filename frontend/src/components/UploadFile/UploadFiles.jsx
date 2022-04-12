import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import UploadService from '@services/uploadFiles.service';

/**
 *
 * @return {Component}
 * @param {props} props
 */
function UploadFile(props) {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState([]);
  const [message, setMessage] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);

  const onDrop = (files) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const uploadFiles = () => {
    const _progressInfos = [];
    for (let i = 0; i< selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }
    setProgressInfos(_progressInfos);
    setMessage([]);
    setFileInfos(() => {
      for (let i = 0; i< selectedFiles.length; i++) {
        upload(i, selectedFiles[i]);
      }
    });
  };

  const upload = (idx, file) => {
    const _progressInfos = progressInfos;
    UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
      setProgressInfos(_progressInfos);
    }).then((response) => {
      setMessage((prev) => {
        const nextMessage = [
          ...prev.message,
          'Uploaded the file successfully: ' + file.name,
        ];
        return { message: nextMessage };
      });
      return UploadService.getFiles();
    }).then((files) => {
      setFileInfos(files.data);
    }).catch(() => {
      _progressInfos[idx].percentage = 0;
      setProgressInfos(_progressInfos);
      setMessage((prev) => {
        const nextMessage = [
          ...prev.message,
          'Could not upload the file: ' + file.name,
        ];
        return {
          message: nextMessage,
        };
      });
    });
  };

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  return (
    <>
      <div>
        {progressInfos &&
          progressInfos.map((progressInfo, index) => (
            <div className="mb-2" key={index}>
              <span>{progressInfo.fileName}</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progressInfo.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progressInfo.percentage + '%' }}
                >
                  {progressInfo.percentage}%
                </div>
              </div>
            </div>
          ))}
        <div className="my-3">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  {selectedFiles &&
                  Array.isArray(selectedFiles) &&
                  selectedFiles.length ? (
                    <div className="selected-file">
                      {selectedFiles.length > 3 ?
                        `${selectedFiles.length} files` :
                        selectedFiles.map((file) => file.name).join(', ')}
                    </div>
                  ) : (
                    `Drag and drop files here, or click to select files`
                  )}
                </div>
                <aside className="selected-file-wrapper">
                  <button
                    className="btn btn-success"
                    disabled={!selectedFiles}
                    onClick={uploadFiles}
                  >
                    Upload
                  </button>
                </aside>
              </section>
            )}
          </Dropzone>
        </div>
        {message.length > 0 && (
          <div className="alert alert-secondary" role="alert">
            <ul>
              {message.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}
        {fileInfos.length > 0 && (
          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {fileInfos &&
                fileInfos.map((file, index) => (
                  <li className="list-group-item" key={index}>
                    <a href={file.url}>{file.name}</a>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default UploadFile;
