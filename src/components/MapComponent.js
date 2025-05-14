import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapComponent = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div>
      <MapContainer
        maxBoundsViscosity={1.0}
        center={[20, 0]}
        zoom={2.5}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "100%" }}
        worldCopyJump={false}
        maxBounds={[[-90, -180], [90, 180]]}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countries.map((country, idx) => (
          <Marker
            key={idx}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            eventHandlers={{
              click: () => setSelectedCountry(country),
            }}
          >
            <Popup>
              <strong>{country.country}</strong>
              <br />
              Click marker for full details below
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Data table below */}
      {selectedCountry && (
        <div className="selected-country-data">
          <h3>{selectedCountry.country} COVID-19 Stats</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Cases:</strong></td>
                <td>{selectedCountry.cases.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Deaths:</strong></td>
                <td>{selectedCountry.deaths.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Recovered:</strong></td>
                <td>{selectedCountry.recovered.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Active:</strong></td>
                <td>{selectedCountry.active.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Critical:</strong></td>
                <td>{selectedCountry.critical.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Tests:</strong></td>
                <td>{selectedCountry.tests.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
