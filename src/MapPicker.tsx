// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// @ts-ignore
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './logo.svg';


interface MapPickerProps {
  id?: string;
  position: number[];
  updatePositions: (newValue: number[]) => void;
}

export const MapPicker: React.FC<MapPickerProps> = ({ id, position, updatePositions }) => {
    const myIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconSize: [26, 42],
      iconAnchor: [13, 42],
      popupAnchor: [0, -41]
    });

  return <>
      <MapContainer center={position} zoom={20} scrollWheelZoom={false} style={{height: '300px'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <Marker position={position} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
  </>;
}
