import React, { useMemo, useState } from 'react';
import './App.css';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { JsonSchema } from '@jsonforms/core';
import FileUploadControl from './FileUploadControl';
import fileInputTester from './fileUploadTester';

const initialData = {};
const schema: JsonSchema = {
  type: 'object',
  properties: {
    file_upload: {
    },
  }
}
const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: 'Control',
      scope: '#/properties/file_upload',
    },
  ]
}

const renderers = [
  ...materialRenderers,
  {renderer: FileUploadControl, tester: fileInputTester},
]

function App() {
  const [data, setData] = useState(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);
  
  return (
    <div className='App'>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ data, errors }) => setData(data)}
      />
      <div>
        <pre id='boundData'>{stringifiedData}</pre>
      </div>
    </div>
  );
}

export default App;
