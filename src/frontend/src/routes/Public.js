import React from 'react';
import { Route } from 'react-router-dom';

const Public = ({
  component: AppComponent
}) => {
  return (
    <Route
      render={(props) => (
        <AppComponent  />
      )}
    />
  );
};

export default Public;
