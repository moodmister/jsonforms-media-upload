import React from 'react';
import { InputLabel } from '@mui/material';

interface FileUploadProps {
  id?: string;
  fileUrls: string[];
  updateFileUrls: (newValue: string[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ id, fileUrls, updateFileUrls }) => {
  const setPreview = (urls: string[]) => {
    if (urls) {
      const images: any[] = [];
      urls.forEach((url: string) => {
        images.push(<a href={url} target='_blank' rel="noreferrer"><img src={url} alt={url}></img></a>);
      });
      return images;
    }
    return <></>
  };

  const handleFile = (event: any) => {
    const fileUrls: string[] = [];
    if (event.target.files) {
      console.log(event.target.files);
      [...event.target.files].forEach((file: any) => {
        fileUrls.push(URL.createObjectURL(file));
      });
      updateFileUrls(fileUrls);
    }
  };

  const dropHandler = (event: any) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      const fileUrls: string[] = [];
      [...event.dataTransfer.items].forEach((item, i) => {
        if (item.kind === 'file') {
          fileUrls.push(URL.createObjectURL(item.getAsFile()));
        }
        updateFileUrls(fileUrls);
      });
    }
    event.target.classList.remove('drag-over');
  };

  const dragOverHandler = (event: any) => {
    event.target.classList.add('drag-over');
    event.preventDefault();
  };
  const dragLeaveHandler = (event: any) => {
    event.target.classList.remove('drag-over');
    event.preventDefault();
  };

  return (
    <>
      <div className='file-upload'>
        <div className="form">
          <InputLabel shrink>Upload file</InputLabel>
          <br />
          <input type='file' accept='image/*' multiple onChange={handleFile}></input>
          <br />
          <div className="drag-drop-box">
            <p>or</p>
            <div
              id='drop-zone'
              onDrop={(event) => {
                dropHandler(event);
              }}
              onDragOver={(event) => {
                dragOverHandler(event);
              }}
              onDragEnter={(event) => {
                dragOverHandler(event);
              }}
              onDragLeave={(event) => {
                dragLeaveHandler(event);
              }}
              >
              <p>
                Drag one or more files to this <i>drop zone</i>.
              </p>
            </div>
          </div>
          <button onClick={() => {updateFileUrls([])}}>Clear</button>
        </div>
        <div className="preview-wrapper">
          <div className="preview">
            {
              setPreview(fileUrls)
            }
          </div>
        </div>
      </div>
    </>
  );
};


