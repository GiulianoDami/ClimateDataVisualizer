import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Visualizations from './Visualizations';

const UserInterface = () => {
  const [data, setData] = useState(null);

  const handleDataUpload = (uploadedData) => {
    setData(uploadedData);
  };

  return (
    <div className="user-interface">
      <h1>Climate Data Visualizer</h1>
      <FileUpload onDataUpload={handleDataUpload} />
      {data && <Visualizations data={data} />}
    </div>
  );
};

export default UserInterface;