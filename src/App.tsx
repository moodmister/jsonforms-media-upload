import { useMemo, useState } from 'react';
import './App.css';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { JsonSchema } from '@jsonforms/core';
import FileUploadControl from './FileUploadControl';
import fileInputTester from './fileUploadTester';
import { Grid } from '@mui/material';
import MapPickerControl from './MapPickerControl';
import mapPickerTester from './mapPickerTester';

const initialData = {
  locations: [
    {
      files: [],
      coordinates: [43.835636, 25.960977]
    }
  ]
};
const schema: JsonSchema = {
  type: 'object',
  properties: {
    locations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          files: {
            type: 'array',
            items: {
              type:'object'
            }
          },
          coordinates: {
            type: 'array',
            items: {
              type: 'number'
            }
          },
          description: {
            type: 'string'
          }
        }
      }
    }
  }
};
const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/locations',
      options: {
        detail: {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/files'
            },
            {
              type: 'Control',
              scope: '#/properties/coordinates'
            },
            {
              type: 'Control',
              scope: '#/properties/description'
            }
          ]
        }
      }
    }
  ]
};

const renderers = [
  ...materialRenderers,
  { renderer: FileUploadControl, tester: fileInputTester },
  { renderer: MapPickerControl, tester: mapPickerTester },
];

function App() {
  const [data, setData] = useState<any>(initialData);
  const [errors, setErrors] = useState<any>([]);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);
  const stringifiedErrors = useMemo(() => JSON.stringify(errors, null, 2), [errors]);
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!data.locations) {
      setErrors([...errors, "Empty fields"]);
      return;
    }
    const formData = new FormData();

    formData.append('document', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    data.locations.forEach((location: any) => {
      // const coordinates = location.coordinates || [];
      // const description = location.description || '';
      // formData.append('location', coordinates);
      // formData.append('description', description);
      location.files.forEach((file: any) => {
        formData.append('uuid_id', file);
      });
    });

    console.log(data);
    fetch('https://httpbin.org/post', {
      method: 'post',
      body: formData,
    }).then(
      response => {
        if (response) {
          return response.text()
        }
      }
    ).then(
      (body => {
        console.log(body);
      })
    );
  };

  return (
    <div className='App'>
      <>
        <Grid
          container
          justifyContent={'center'}
          spacing={1}>
          <Grid item sm={6}>
            <form onSubmit={handleSubmit}>
              <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={renderers}
                cells={materialCells}
                onChange={({ data, errors }) => { setData(data); setErrors(errors); }}
              />
              <button>Submit</button>
              </form>
          </Grid>
        </Grid>
        <div>
          <pre id="boundData">{stringifiedData}</pre>
          <pre id="boundErrors">{stringifiedErrors}</pre>
        </div>
      </>
    </div>
  );
}

export default App;
