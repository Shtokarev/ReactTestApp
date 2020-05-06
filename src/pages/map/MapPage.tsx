import React, { Suspense } from "react";

const Map = React.lazy(() => import("../../modules/Mapbox/Map/Map"));

const MapPage: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Map />
      </Suspense>
    </div>
  );
};

export default MapPage;
