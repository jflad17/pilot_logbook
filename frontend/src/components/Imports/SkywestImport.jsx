import React from 'react';
import UploadFiles from '@customComponents/UploadFiles/UploadFiles';

/**
 *
 * @return {Component} SkywestImport Component
 */
function SkywestImport() {
  return (
    <>
      <center><h2>Skywest File Import</h2></center>
      <UploadFiles type={'skywest'}/>
    </>
  );
}

export default SkywestImport;
