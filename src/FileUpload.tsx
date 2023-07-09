import React, { useMemo } from 'react';

interface FileUploadProps {
  id?: string;
  files: File[];
  updateFiles: (newValue: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ id, files, updateFiles }) => {
  const imgTags = useMemo(() => {
    if (files) {
      return files.map(file => {
        const url = URL.createObjectURL(file);
        return <img src={url} alt={url.split('/').pop()} key={url.split('/').pop()}></img>
      });
    }
  }, [files]);
  const handleFile = (event: any) => {
    const newFiles: File[] = [];
    if (files) {
      files.forEach(url => { newFiles.push(url) });
    }
    if (event.target.files) {
      [...event.target.files].forEach((file: any) => {
        newFiles.push(file);
      });
      updateFiles(newFiles);
    }
  };

  const dropHandler = (event: any) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      const newFiles: File[] = [];
      if (files) {
        files.forEach(url => { newFiles.push(url) });
      }
      [...event.dataTransfer.items].forEach(item => {
        if (item.kind === 'file') {
          newFiles.push(item.getAsFile());
        }
        updateFiles(newFiles);
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
          <div className="drag-drop-box">
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
              <input type='file' accept='image/*' multiple onChange={handleFile}></input>
              {imgTags}
            </div>
          </div>
        </div>
        <button onClick={() => {updateFiles([])}}>Clear</button>
      </div>
    </>
  );
};


