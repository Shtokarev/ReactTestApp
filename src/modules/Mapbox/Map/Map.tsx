import React from "react";
import mapboxgl from "mapbox-gl";
import css from "./Map.module.scss";

const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = accessToken;

const mapBoxStyles = [
  {
    name: "streets",
    id: "streets-v11",
  },
  {
    name: "light",
    id: "light-v10",
  },
  {
    name: "dark",
    id: "dark-v10",
  },
  {
    name: "outdoors",
    id: "outdoors-v11",
  },
  {
    name: "satellite",
    id: "satellite-v9",
  },
  {
    name: "satellite-streets",
    id: "satellite-streets-v11",
  },
];

interface MapProps {}
interface MapState {
  lng: number;
  lat: number;
  zoom: number;
}

class Map extends React.PureComponent<MapProps, MapState> {
  mapRef = React.createRef<HTMLDivElement>();
  map: mapboxgl.Map | undefined;

  constructor(props: MapProps) {
    super(props);
    this.state = {
      lng: -57.769,
      lat: -32.807,
      // lng: -56.538,
      // lat: -34.734,
      zoom: 14.9,
    };
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapRef.current!,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    this.map.on("style.load", () => {
      this.addSourceAndLayer();
    });

    this.map.on("move", () => {
      this.setState({
        lng: this.map!.getCenter().lng,
        lat: this.map!.getCenter().lat,
        zoom: this.map!.getZoom(),
      });
    });
  }

  addSourceAndLayer = () => {
    const style = this.map!.getStyle();
    console.log(style);

    if (!this.map!.getSource("testTileSet")) {
      this.map!.addSource("testTileSet", {
        url: "mapbox://bfmachine.testTileSet",
        type: "raster",
        tileSize: 256,
      });

      this.map!.addLayer({
        id: "bfmachine-testtileset",
        type: "raster",
        source: "testTileSet",
        layout: {},
        paint: {},
      });
    }

    if (!this.map!.getSource("test2tileSetName")) {
      this.map!.addSource("test2tileSetName", {
        url: "mapbox://bfmachine.test2tileSetName",
        type: "vector",
      });

      this.map!.addLayer({
        id: "bfmachine-testtileset2",
        type: "fill",
        source: "test2tileSetName",
        "source-layer": "trees4_spe_(3)",
        layout: {},
        paint: {
          "fill-color": "#4eea34",
          "fill-opacity": 0.8,
        },
      });
    }
  };

  switchLayer = (id: string) => {
    this.map!.setStyle("mapbox://styles/mapbox/" + id);
  };

  renderButtons = () =>
    mapBoxStyles.map((button) => (
      <button
        key={button.id}
        type="button"
        onClick={() => this.switchLayer(button.id)}
      >
        {button.name}
      </button>
    ));

  render() {
    return (
      <div className={css.container}>
        <div className={css.Map}>
          <div className={css.buttonsBlock}>
            <p>Map types switcher</p>
            {this.renderButtons()}
          </div>
          <div ref={this.mapRef} className={css.mapContainer} />
          <div className={css.sidebarStyle}>
            <div>
              Longitude: {this.state.lng.toFixed(4)} | Latitude:{" "}
              {this.state.lat.toFixed(4)} | Zoom: {this.state.zoom.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
