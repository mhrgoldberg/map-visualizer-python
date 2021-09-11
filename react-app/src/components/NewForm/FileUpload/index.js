// import React, { useState, useEffect } from 'react'
// import Dropzone from 'react-dropzone'
// import gpsFileSanitizer from './GpsFileSanitizer'
// import { useDispatch } from 'react-redux'

// // Component allows users to drag and drop GPX file to upload
// // GPX data is read, sanitized, and updates File
// // Data updates FileContext

// export default function FileUpload() {
//   const [rawFile, setRawFile] = useState(null)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     //  Whenever rawFile updates then parse/sanitize data then dispatch action
//     if (rawFile !== null) {
//         console.log(rawFile)
//         } else {
//           alert('Sorry, we can only accept GPX files')
//         }
//       }
//     }
//   }, [rawFile, dispatch])

//   return (
//     <Dropzone
//       onDrop={(newFileArray) => {
//         setRawFile(newFileArray[0])
//       }}
//     >
//       {({ getRootProps, getInputProps, isDragActive }) => (
//         <div
//           style={{
//             borderColor: `${isDragActive ? '#09f7a0' : '#f8f9fa'}`,
//             color: `${isDragActive ? '#09f7a0' : '#f8f9fa'}`,
//           }}
//           {...getRootProps()}
//           id="upload-button"
//         >
//           <input {...getInputProps()} />
//           <h1 className="upload-header">
//             Upload GPX data by clicking to browse your files or drag and drop
//             directly here!
//           </h1>
//         </div>
//       )}
//     </Dropzone>
//   )
// }

import React from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { useState, useCallback } from 'react'

export default function FileUpload(props) {
  const [files, setFiles] = useState([])
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.map((file) => {
        // setFiles([...files, file])
        console.log(files)
        props.updateFieldByName('file', file)
      })
    },
    [props.updateFieldByName, files, setFiles]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop })

  if (files.length > 0) {
    return files
  } else {
    return (
      <FileUploadContainer
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop or click to select a GPX file here.</p>
      </FileUploadContainer>
    )
  }
}

const getColor = (props) => {
  if (props.isDragAccept) {
    return 'var(--primary-green)'
  }
  if (props.isDragReject) {
    return 'var(--primary-alert)'
  }
  if (props.isDragActive) {
    return 'var(--primary-blue)'
  }
  return 'var(primary-cyan)'
}

const FileUploadContainer = styled.div`
  /* flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; */

  padding: 2rem;
  border-width: 0.3rem;
  width: calc(100% - 7rem);
  border-radius: var(--input-border-radius);
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  color: var(--primary-light);
  outline: none;
  transition: border 0.24s ease-in-out;
  p {
    text-align: center;
  }
`
