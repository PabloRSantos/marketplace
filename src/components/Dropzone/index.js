import React, {useCallback, useState} from 'react'
import {useDropzone} from "react-dropzone"
import "./style.css"
import { FiUpload } from "react-icons/fi"


const Dropzone = ({ onFileUploaded } ) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState("")
  
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]

        const fileUrl = URL.createObjectURL(file)
        setSelectedFileUrl(fileUrl)
        onFileUploaded(file)
  }, [onFileUploaded])
  const {getRootProps, getInputProps} = useDropzone({
      onDrop,
      accept: "image/*"
    })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
          
        { selectedFileUrl ? 
        <img src={selectedFileUrl} alt="Point thumbnail" />
            : (
                 <p>
                    <FiUpload />
                    Imagem do Produto
                 </p>
            )}
    </div>
  )
}

//accept define q arquivos podem ser enviados
export default Dropzone