import React, { useContext, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

// interface IProps {
//   setFiles: (files: object[]) => void;
// }

const dropzoneStyles = {
  border: 'dashed 3px',
  borderColor: '#eee',
  borderRadius: '5px',
  paddingTop: '30px',
  textAlign: 'center' as 'center',
  height: '150px'
};

const dropzoneActive = {

  borderColor: 'green'
};



const FileDropzone = () => {
  const rootStore = useContext(RootStoreContext);
  const { addFile } = rootStore.fileStore;

 const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone();

  // const [fileNames, setFileNames] = useState<string[]>([]);

  // const onDrop = useCallback(acceptedFiles => {
  //   setFileNames([...fileNames, acceptedFiles.map((file: { name: any; }) => file.name)]);
  // }, [setFileNames]);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  acceptedFiles.map(file => (
    addFile(file)
  ));
 

  return (
    <section className="container">
      <div
        {...getRootProps()}
        style={
          isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles
        }
      >
        <input {...getInputProps()} />
        <Icon name='upload' size='huge' />
        <Header content='Drop file or Click here' />


      </div>
      {/* {fileList &&
    <aside>
     {fileList.map(file => (
     <span> {file.name} </span>
    ))
     }
    </aside>
    } */}
      {/* { filesByName.map(file => (
        <span> {file.name} </span>
      ))

      } */}
      {/* <span> {fileNames} </span> */}

    </section>
  );
};

export default FileDropzone;
