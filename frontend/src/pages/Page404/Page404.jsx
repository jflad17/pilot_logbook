import React from 'react';
import { Box } from '@mui/material';
import bg from '@images/sky.jpg';
import skyError from '@images/skyError.png';


/**
 * 404 Page Component
 * @returns {JSX}
 */

const Page404 = () => {
  React.useEffect(() => {
    document.body.style.backgroundImage = `url('${bg}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundColor = 'white';
    };
  }, []);
  return (
    <>
      <div style={{ marginTop: '200px' }}>
        <center>
          <Box
            component="img"
            src={skyError}
            sx={{
              width: 600,
              height: 500,
              maxWidth: { xs: 400, md: 600 },
              maxHeight: { xs: 300, md: 500 },
            }}
            alt='404 Oops page does not exist' />
        </center>
      </div>
    </>
  );
};

export default Page404;
