import { withJsonFormsControlProps } from '@jsonforms/react';
import { MapPicker } from './MapPicker';

interface MapPickerControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const MapPickerControl = ({ data, handleChange, path }: MapPickerControlProps) => (
  <MapPicker
    position={data}
    updatePositions={(newValue: any) => { handleChange(path, newValue); }}
  />
)

export default withJsonFormsControlProps(MapPickerControl);
