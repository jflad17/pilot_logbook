import axios from 'axios';
/**
 * Upload Files Service
 */
class UploadFilesService {
  /**
   * @return {FormData} Upload file function
   * @param {file} file to upload
   * @param {file} onUploadProgress for progress bar
   */
  upload(file, onUploadProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }
  /**
   * @return {files} returns many files
   */
  getFiles() {
    return axios.get('/files');
  }
}

export default new UploadFilesService();
