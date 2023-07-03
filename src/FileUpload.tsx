import React, { useMemo } from 'react';

interface FileUploadProps {
  id?: string;
  fileUrls: string[];
  updateFileUrls: (newValue: string[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ id, fileUrls, updateFileUrls }) => {
  const imgTags = useMemo(() => {
    if (fileUrls) {
      return fileUrls.map(url => <img src={url} alt={url.split('/').pop()} key={url.split('/').pop()}></img>);
    }
  }, [fileUrls]);
  const handleFile = (event: any) => {
    const newFileUrls: string[] = [];
    if (fileUrls) {
      fileUrls.forEach(url => { newFileUrls.push(url) });
    }
    if (event.target.files) {
      [...event.target.files].forEach((file: any) => {
        const url = URL.createObjectURL(file);
        newFileUrls.push(url);
      });
      updateFileUrls(newFileUrls);
    }
  };

  const dropHandler = (event: any) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      const newFileUrls: string[] = [];
      if (fileUrls) {
        fileUrls.forEach(url => { newFileUrls.push(url) });
      }
      [...event.dataTransfer.items].forEach(item => {
        if (item.kind === 'file') {
          newFileUrls.push(URL.createObjectURL(item.getAsFile()));
        }
        updateFileUrls(newFileUrls);
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
        <button onClick={() => {updateFileUrls([])}}>Clear</button>
      </div>
    </>
  );
};


