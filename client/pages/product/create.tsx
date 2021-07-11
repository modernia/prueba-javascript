import React, { useCallback, useState } from 'react';
import Head from 'next/head'
import { useDropzone } from 'react-dropzone'
import { CloudUpload } from 'heroicons-react'
import { toast } from 'react-toastify'
const { v4: uuidv4 } = require('uuid')

import uploadImage from '../../utils/storageUpload'
import Header from '../../components/Header/Header'
import CreateForm from '../../components/Product/CreateForm'


export default function create() {


	const [fileUpload, setFileUpload] = useState(null)
	const [imageURL, setImageURL] = useState(null)
  const [loading, setLoading] = useState(false)
  

	const onDrop = useCallback((acceptedFile) => {
  	const file = acceptedFile[0];
  	setFileUpload({
      type: "image",
      file,
      preview: window.URL.createObjectURL(file)
    })
  })

  const onPublish = async () => {
    try {
	    const extension = fileUpload?.file.type.split('/')[1]
	    const imageName = `${uuidv4()}.${extension}`

	    const data = await uploadImage(fileUpload?.file, imageName, 'products')

	    data.ref.getDownloadURL().then(async function(downloadURL) {
	      try {
	        const image = await downloadURL

	        if(image) {
	          toast.success('Imagen subida')
	          setImageURL(image)
	        }
	        
	        setLoading(false)

	      } catch (error) {
	        console.log(error);
	      }
    	});


    } catch (error) {
      console.log(error)
    }
  }

	const { getRootProps, getInputProps } = useDropzone({
	  accept: 'image/jpeg, image/png, image/jpg',
	  noKeyboard: false,
	  multiple: false,
	  onDrop
	})

	return (
		<>
			<Head>
        <title>Publicar nuevo producto</title>
      </Head>

			<Header />

			
			<div className="mx-auto md:max-w-screen-sm flex flex-col mx-auto">
				<div style={{marginBottom: '50px'}} className="relative h-40 w-52 flex items-center content-center flex-col mx-auto">
					<div {...getRootProps()} className="dropzone" style={fileUpload && { border: 0 }} >
		        {
		          !fileUpload && (
		            <div className="mx-auto cursor-pointer">
		              <CloudUpload color="#598aca" size={50} className="mx-auto" />
		              <p>Arrastra una imagen o selecciona para el producto</p>
		            </div>
		          )
		        }
		        <input {...getInputProps()}  />
		      </div>

		      {
		        fileUpload?.type === "image" && (
		          <div className="image border-2 border-gray-200 p-2 h-52 w-52" style={{backgroundImage: `url("${fileUpload.preview}")`}} />
		        )
		      }

		      {
		        fileUpload && (
		          <button onClick={onPublish} style={{bottom: '-60px'}} className="absolute bg-blue-500 hover:bg-blue-800 text-white w-full rounded py-2 px-3">
		            Subir
		          </button>
		        )
		      }
				</div>
				<div className="mx-auto">
					<span className="text-sm text-gray-400 text-bold my-3 mt-4">*Subir imagen primero</span>
				</div>

				<CreateForm image={imageURL} />
				
			</div>
		</>
	)
}

