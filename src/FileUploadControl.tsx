import { withJsonFormsControlProps } from '@jsonforms/react';
import { FileUpload } from './FileUpload';

interface FileUploadControlProps {
  data: any;
  handleChange(path: string, value: File[]): void;
  path: string;
}

const FileUploadControl = ({ data, handleChange, path }: FileUploadControlProps) => (
  <FileUpload
    files={data}
    updateFiles={(newValue: File[]) => { handleChange(path, newValue); }}
  />
)

export default withJsonFormsControlProps(FileUploadControl);
