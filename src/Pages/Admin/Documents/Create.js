import React, { useEffect, useState } from 'react'
import { createDocument, getDocument, updateDocuments, uploadFile } from '../../../Core/ApiCore/Documents'

import * as _ from 'lodash'

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { isEmpty } from 'lodash'

const Create = (props) => {

    const [documents , setDocuments] = useState({
        "Title":"title",
        "subtitle":"sub title",
        "summary":"summary",
        "keywords":"keywords",
    })

    const [formData] = useState(new FormData())

    const [documentEdit , setDocumentEdit] = useState()
    const [file , setFile] = useState()

    const handleDocuments = e =>{
        setDocuments({...documents , [e.target.id]: e.target.value})
    }

    const handleFile = e =>{
        setFile(e.target.files['0'])
        // formData.append('file',e.target.files['0'])
    }

    const handleDocumentEdit = e => setDocumentEdit({...documentEdit , [e.target.id]:e.target.value})

    const submitDocument = e =>{
        e.preventDefault()

        createDocument(documents)
            .then(res=>{
                if(res.success){

                    console.log('file',file)

                    
                    formData.append('file',file)
                    console.log('id',res.data.id)
                    console.log('file',formData.get('file'))
                    uploadFile(formData,res.data.id)
                        .then(res=>console.log(res))

                    toastr.options.progressBar = true
                    toastr.success(res.message,"success")
                    props.history.push(`/admin/documents`)

                }else{
                    _.forEach(res.errors, function(error) {
                        toastr.options.progressBar = true
                        toastr.error(error,"success")
                      });
                    
                }
            })
    }

    const submitUpdateDocument = e =>{
        e.preventDefault()
        let id = props.match.params.id
        updateDocuments(id , documentEdit)
            .then(res=>{
                if(res.success){
                    toastr.options.progressBar = true
                    toastr.success(res.message,"success")
                    props.history.push(`/admin/documents`)
                }else{
                    toastr.options.progressBar = true
                    toastr.error(res.message,"error")
                }
            })
    }

    useEffect(() => {
        let id = props.match.params.id

        if(id){
            getDocument(id)
                .then(res=>{
                    setDocumentEdit(res)
                })
        }

    }, [])

    return (
        <div>
            <form onSubmit={!isEmpty(documentEdit) ? submitUpdateDocument : submitDocument}>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label className="form-label" htmlFor="Title">Title</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    onChange={!isEmpty(documentEdit) ? handleDocumentEdit : handleDocuments}
                                    value={!isEmpty(documentEdit) ? documentEdit.Title : documents.Title}
                                    id="Title"
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label className="form-label" htmlFor="subtitle">SubTitle</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    onChange={!isEmpty(documentEdit) ? handleDocumentEdit : handleDocuments}
                                    value={!isEmpty(documentEdit) ? documentEdit.subtitle : documents.subtitle}
                                    id="subtitle"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <label className="form-label" htmlFor="summary">Summary</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    onChange={!isEmpty(documentEdit) ? handleDocumentEdit : handleDocuments}
                                    value={!isEmpty(documentEdit) ? documentEdit.summary : documents.summary}
                                    id="summary"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <label className="form-label" htmlFor="keywords">KeyWords</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    onChange={!isEmpty(documentEdit) ? handleDocumentEdit : handleDocuments}
                                    value={!isEmpty(documentEdit) ? documentEdit.keywords : documents.keywords}
                                    id="keywords"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <label className="form-label" htmlFor="file">upload File</label>
                                <input 
                                    type="file"
                                    className="form-control"
                                    id="file"
                                    onChange={handleFile}
                                    required
                                />
                            </div>
                        </div>
                        {JSON.stringify(documents)}
                        <button type="submit" className="btn btn-primary w-100">Save Document</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Create
