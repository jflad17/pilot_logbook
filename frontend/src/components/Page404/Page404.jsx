import React from 'react';
import Image from 'react-bootstrap/Image';
import skyError from '../../images/skyError.png';

/**
 * 404 Page Component
 * @returns {JSX}
 */

const Page404 = () => {
  return (
    <>
      <div style={{ marginTop: '200px' }}>
        <center>
          <Image fluid={true} src={skyError} width={600} height={600} alt='404 Oops page does not exist' />
        </center>
      </div>
    </>
  );
};

export default Page404;
