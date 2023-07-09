// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// @ts-ignore
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
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
  const initialCenter = position;

  const handleMoveEnd = (ev) => {
    const latLng = ev.target.getLatLng();
    updatePositions([latLng.lat, latLng.lng]);
  };

  return <>
      <MapContainer center={initialCenter} zoom={20} scrollWheelZoom={true} style={{height: '300px'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <Marker draggable={true} eventHandlers={{ moveend: handleMoveEnd }} position={position} icon={myIcon}>
        </Marker>
      </MapContainer>
  </>;
}
