import axios from 'axios';
import { toast } from 'react-toastify';
import React from 'react';
import {
  // Box,
  Button,
  Paper,
  Grid,
  // TextField
} from '@mui/material';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { AutoComplete } from '@components';
import { useReport } from '@api';
// import { Document, Page, pdfjs } from 'react-pdf';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
/**
 * Reports Component
 * @returns {JSX}
 */

const Reports = () => {
  // pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const reports = useReport();
  const [reportName, setReportName] = React.useState(null);
  // const [pdfString, setPdfString] = React.useState('');
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };
  // React.useEffect(() => {
  //   console.log(reportName);
  // }, []);
  const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };
  const onViewClick = async (e) => {
    const file = {};
    let response = {};
    // let object = null;
    if (reportName != null) {
      try {
        response = await axios(`/report/${reportName}/`, {
          method: 'POST',
          responseType: 'arraybuffer',
          data: {},
        });
      } catch (error) {
        toast.error('Error Generating Report');
        console.log(error);
      };
      file.response = response;
      file.data = response.data;
      try {
        file.blob = new Blob([response.data], { type: 'application/pdf' });
      } catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
          window.WebKitBlobBuilder ||
          window.MozBlobBuilder ||
          window.MSBlobBuilder;
        if (e.name == 'TypeError' && window.BlobBuilder) {
          const bb = new BlobBuilder();
          bb.append(response.data.buffer);
          file.blob = bb.getBlob('application/pdf');
        } else if (e.name == 'InvalidStateError') {
          file.blob = new Blob([response.data.buffer], { type: 'application/pdf' });
        } else {
          toast.error('Sorry reports are not supported on this device!');
        }
      }
      console.log('e', e);
      console.log('window', window);
      console.log(file);
      // let base64String;
      // const reader = new FileReader();
      // reader.readAsDataURL(file.blob);
      // reader.onloadend = () =>{
      //   base64String = reader.result;
      //   console.log('reader', reader);
      //   console.log('readerresult', reader.result);
      //   // file.url = base64String.split(',')[1];
      // };
      file.url = await blobToBase64(file.blob);
      // file.url = URL.createObjectURL(file.blob);
      const contentDis = response.headers['content-disposition'];
      if (contentDis) {
        file.name = contentDis.split('=')[1].trim().replace('"', '');
      }
      document.querySelector('#pdfReport').innerHTML = '';
      const object = document.createElement('object');
      object.setAttribute('width', '100%');
      object.setAttribute('height', '100%');
      document.querySelector('#pdfReport').appendChild(object);
      console.log('fileurl', file.url);
      object.setAttribute('data', file.url);
      object.setAttribute('type', 'application/pdf');
    } else {
      toast.error('No Report Selected!');
    }
  };

  // const styles = StyleSheet.create({
  //   page: {
  //     flexDirection: 'row',
  //     backgroundColor: '#C0C0C0',
  //   },
  //   section: {
  //     margin: 10,
  //     padding: 10,
  //     flexGrow: 1,
  //   },
  // });

  // const MyPdf = () => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <View style={styles.section}>
  //         <Text>Heading #1</Text>
  //       </View>
  //       <View style={styles.section}>
  //         <Text>Heading #2</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // );

  return (
    <>
      <Paper elevation={3} square>
        <center><h2>Reports</h2></center>
        {/* <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          > */}
        <center>
          <Grid container justifyContent="center">
            {/* <AutoComplete
            // defaultValue=""
            label='Report Name'
            name="reportName"
            data={reports.data}
            inputName={'name'}
            isLoading={reports.isLoading}
          /> */}
            <AutoComplete
              label='Report Name'
              name='reportName'
              data={reports.data}
              isLoading={reports.isLoading}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(e, data) => {
                // console.log('data', data);
                setReportName(data ? data.name: null);
              }}
              sx={{ minWidth: 250, maxWidth: 400 }}
              defaultValue={reportName}

              // disabled
            />
            <Button variant="contained" color="primary" onClick={onViewClick}>View</Button>
          </Grid>
        </center>
        {/* </center>
          </Box> */}
        {/* <TextField /> */}
        <center>
          {/* <PDFViewer minWidth={375} width={'100%'} minHeight={500} height={650}>
            <MyPdf />
          </PDFViewer> */}
          <div id='pdfReport' style={{
            minWidth: '300px',
            height: '500px',
          }}>
          </div>
          {/* <Document
            file={`data:application/pdf;base64,${pdfString}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document> */}
        </center>
      </Paper>
    </>
  );
};

export default Reports;
