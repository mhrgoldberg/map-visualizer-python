import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { FormInputContainer } from '../../../styles/formStyles'

export default function FileUpload({ updateFieldByName, error }) {
  const [file, setFile] = useState(null)

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.map((file) => {
        updateFieldByName('file', file)
        setFile(file)
        return file
      })
    },
    [updateFieldByName, setFile]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, maxFiles: 1 })

  if (!error && file) {
    return <div>{file.name}</div>
  } else {
    return (
      <FormInputContainer>
        <label>Upload a GPX File</label>
        <FileUploadContainer
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
          error={error}
        >
          <input {...getInputProps()} />
          <p>
            {error ||
              "Drag 'n' drop or click to select a GPX file. Only one file can be uploaded per route"}
          </p>
        </FileUploadContainer>
      </FormInputContainer>
    )
  }
}

const getColor = (props, defaultColor = 'var(--primary-cyan)') => {
  if (props.errors?.file || props.isDragReject || props?.error) {
    return 'var(--primary-alert)'
  }
  if (props.isDragAccept) {
    return 'var(--primary-green)'
  }
  if (props.isDragActive) {
    return 'var(--primary-blue)'
  }
  return defaultColor
}

const FileUploadContainer = styled.div`
  margin-top: 1rem;
  padding: 2rem;
  border-width: 0.3rem;
  width: 100%;
  border-radius: var(--input-border-radius);
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  color: ${(props) => getColor(props, 'var(--primary-gray)')};
  outline: none;
  transition: border 0.24s ease-in-out;
  &:hover {
    cursor: pointer;
  }

  p {
    text-align: center;
    font-size: 1.5rem;
  }
`
