import React, { useEffect, useState } from 'react'

import {Link} from 'react-router-dom'

import { isEmpty, isNull } from 'lodash'

import { getDocuments, removeDocuments, searchDocuments } from '../../../Core/ApiCore/Documents'

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import isAuth from '../../../Core/helpers/isAuth'
import { API_URL_LINK } from '../../../config'

const Documents = (props) => {

    const [documents , setDocuments] = useState([])
    const [keywords , setKeywords] = useState('')

    const {user} = isAuth()

    const handleSearch = e => setKeywords(e.target.value)

    const deleteDocument = (id) => {
        removeDocuments(id)
            .then(res=>{
                if(res.success){
                    let documentList = documents
                    documentList = documentList.filter(document => document.id !== id)
                    setDocuments(documentList)
                    
                    toastr.options.progressBar = true
                    toastr.success(res.message,"success")
                }else{
                    toastr.options.progressBar = true
                    toastr.error(res.message,"success")
                }
                
            })
    }

    useEffect(() => {
        searchDocuments(keywords)
            .then(res=>{
                if(res){
                    setDocuments(res.data)
                }
            })
    }, [keywords])

    useEffect(() => {
        getDocuments()
            .then(res=>setDocuments(res.data))
    }, [])



    return (
            <div>
                <div className="d-flex justify-content-between align-items-center my-4">
                    <div className="">
                        <h5 className="">All documents</h5>
                    </div>
                    <div className="search">
                        <input 
                            type="text"
                            onChange={e => {handleSearch(e)}}
                            placeholder="Search ..."
                            className="form-control"
                        />
                    </div>
                </div>
                <table className="table table-responsive">
                    <thead className="table-light">
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>subtitle</th>
                            <th>summary</th>
                            <th>keywords</th>
                            <th>date</th>
                            <th>file</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                        {!isEmpty(documents) ? documents.map((document,i)=>(
                        <tr key={i}>
                            <td>{document.id}</td>
                            <td>{document.Title}</td>
                            <td>{document.subtitle}</td>
                            <td>{document.summary}</td>
                            <td>{document.keywords}</td>
                            <td>{document.created_at}</td>
                            <td>
                                {!isEmpty(document.file) && (
                                    <iframe  src={`${API_URL_LINK}/storage/${document.file.path}`} type="application/pdf" width="100px" height="100px" ></iframe>
                                )}
                            </td>
                            <td>
                                <div className="d-flex gap-3">
                                    {user.id === document.user_id && (
                                        <>
                                            <Link onClick={()=>props.history.push(`/admin/documents/edit/${document.id}`)} to="#" className="text-success fw-bold">
                                                <i className='bx bx-edit'></i>
                                            </Link>
                                            <Link to="#" onClick={()=>deleteDocument(document.id)} className="text-danger  fw-bold">
                                                <i className='bx bx-trash'></i>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                        )) : 
                        <>
                        <tr>
                            <td colSpan="6"><h6 className="text-center">Document not exist</h6></td>
                        </tr>
                        </>
                        }                    
                    </tbody>
                </table>           
            </div>
    )
}

export default Documents
