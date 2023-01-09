import React from 'react';
import {
  // Box,
  Button,
  Paper,
  Grid,
  // TextField
} from '@mui/material';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { AutoComplete } from '@components';
import { useReport } from '@api';
/**
 * Reports Component
 * @returns {JSX}
 */

const Reports = () => {
  const reports = useReport();
  const [reportName, setReportName] = React.useState(null);
  React.useEffect(() => {
    console.log(reportName);
  }, []);

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#C0C0C0',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  const MyPdf = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Heading #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Heading #2</Text>
        </View>
      </Page>
    </Document>
  );

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
            <Button variant="contained" color="primary">View</Button>
          </Grid>
        </center>
        {/* </center>
          </Box> */}
        {/* <TextField /> */}
        <center>
          <PDFViewer width={500} height={500}>
            <MyPdf />
          </PDFViewer>
        </center>
      </Paper>
    </>
  );
};

export default Reports;
