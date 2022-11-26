import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
// import { AutoComplete } from '@components/Form';
/**
 * Reports Component
 * @returns {JSX}
 */

const Reports = () => {
  React.useEffect(() => {

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
      <Box className='flight-table'>
        <Box
          className='flight-table-bg'>
          <center><h1>Reports</h1></center>
          {/* <AutoComplete
            defaultValue=""
            label='Report Name'
            name="reportName"
            data={
              [{ name: 'TEST', option: '1' }]
            }
            isLoading={false}
          /> */}
          <TextField />
          <Button variant="contained" color="primary">View</Button>
        </Box>
        <PDFViewer width={500} height={500}>
          <MyPdf />
        </PDFViewer>
      </Box>
    </>
  );
};

export default Reports;
