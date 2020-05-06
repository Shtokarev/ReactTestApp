import React, { Suspense } from "react";

const Upload = React.lazy(() => import("../../modules/Mapbox/Upload/Upload"));

const MapUploadPage: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Upload />
      </Suspense>
    </div>
  );
};

export default MapUploadPage;
