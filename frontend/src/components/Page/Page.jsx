import React from 'react';

const Page = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {props}
    </main>
  );
};

export default Page;
