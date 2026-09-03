import React, { useState } from 'react'
import './Documents.css'

function Documents() {

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Resume',
      file: 'resume.pdf',
      type: 'Resume',
      status: 'verified',
      icon: '📄'
    },
    {
      id: 2,
      name: 'Academic Record',
      file: 'academic-record.pdf',
      type: 'Academic Record',
      status: 'pending',
      icon: '🎓'
    },
    {
      id: 3,
      name: 'Certificate',
      file: 'machine-learning-certificate.pdf',
      type: 'Certificate',
      status: 'verified',
      icon: '🏆'
    },
    {
      id: 4,
      name: 'Internship Report',
      file: 'internship-report.pdf',
      type: 'Internship Report',
      status: 'rejected',
      icon: '💼'
    }
  ])

  const [showUpload, setShowUpload] = useState(false)
  const [selectedType, setSelectedType] = useState('')

  /* =========================
     STATUS
  ========================= */

  const getStatus = (status) => {

    if (status === 'verified') {
      return (
        <span className="document-status verified">
          ✓ Verified
        </span>
      )
    }

    if (status === 'pending') {
      return (
        <span className="document-status pending">
          ⏳ Pending Verification
        </span>
      )
    }

    return (
      <span className="document-status rejected">
        ✗ Rejected
      </span>
    )
  }


  /* =========================
     DELETE DOCUMENT
  ========================= */

  const handleDelete = (id) => {

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this document?'
      )

    if (!confirmDelete) return

    setDocuments(
      documents.filter(
        (document) => document.id !== id
      )
    )
  }


  /* =========================
     UPLOAD DOCUMENT
  ========================= */

  const handleUpload = (e) => {

    e.preventDefault()

    const formData =
      new FormData(e.target)

    const file =
      formData.get('document')

    const type =
      formData.get('documentType')

    if (!file || !file.name) {

      alert('Please select a document.')

      return
    }

    if (!type) {

      alert('Please select document type.')

      return
    }

    const newDocument = {

      id: Date.now(),

      name: type,

      file: file.name,

      type: type,

      status: 'pending',

      icon:
        type === 'Resume'
          ? '📄'
          : type === 'Certificate'
          ? '🏆'
          : type === 'Academic Record'
          ? '🎓'
          : type === 'Internship Report'
          ? '💼'
          : '📁'

    }

    setDocuments([
      newDocument,
      ...documents
    ])

    setShowUpload(false)

    setSelectedType('')

    alert(
      'Document uploaded successfully. Verification is pending.'
    )
  }


  /* =========================
     DOCUMENT COUNTS
  ========================= */

  const totalDocuments =
    documents.length

  const verifiedDocuments =
    documents.filter(
      (doc) =>
        doc.status === 'verified'
    ).length

  const pendingDocuments =
    documents.filter(
      (doc) =>
        doc.status === 'pending'
    ).length

  const rejectedDocuments =
    documents.filter(
      (doc) =>
        doc.status === 'rejected'
    ).length


  return (

    <div className="documents-page">


      {/* =================================================
         HEADER
      ================================================= */}

      <div className="documents-header">

        <div>

          <p className="page-tag">
            STUDENT PORTAL
          </p>

          <h1>
            My Documents
          </h1>

          <p className="page-description">
            Upload and manage your academic
            and professional documents.
          </p>

        </div>


        <button
          className="upload-btn"
          onClick={() =>
            setShowUpload(true)
          }
        >
          + Upload Document
        </button>

      </div>


      {/* =================================================
         SUMMARY
      ================================================= */}

      <div className="document-summary">


        <div className="summary-card">

          <div className="summary-icon blue">
            📁
          </div>

          <div>

            <p>
              Total Documents
            </p>

            <h2>
              {totalDocuments}
            </h2>

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon green">
            ✓
          </div>

          <div>

            <p>
              Verified
            </p>

            <h2>
              {verifiedDocuments}
            </h2>

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon orange">
            ⏳
          </div>

          <div>

            <p>
              Pending
            </p>

            <h2>
              {pendingDocuments}
            </h2>

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon red">
            ✗
          </div>

          <div>

            <p>
              Rejected
            </p>

            <h2>
              {rejectedDocuments}
            </h2>

          </div>

        </div>


      </div>


      {/* =================================================
         DOCUMENT LIST
      ================================================= */}

      <section className="documents-section">


        <div className="section-heading">

          <div>

            <p className="section-tag">
              DOCUMENT MANAGEMENT
            </p>

            <h2>
              Your Documents
            </h2>

          </div>


          <span className="document-count">
            {totalDocuments} Documents
          </span>

        </div>


        <div className="documents-list">


          {documents.length === 0 ? (

            <div className="empty-documents">

              <div className="empty-icon">
                📂
              </div>

              <h3>
                No documents uploaded
              </h3>

              <p>
                Upload your resume,
                certificates and other
                documents to get started.
              </p>

              <button
                className="upload-btn"
                onClick={() =>
                  setShowUpload(true)
                }
              >
                + Upload Document
              </button>

            </div>

          ) : (

            documents.map((document) => (

              <div
                className="document-card"
                key={document.id}
              >


                {/* ICON */}

                <div className="document-icon">
                  {document.icon}
                </div>


                {/* INFORMATION */}

                <div className="document-info">

                  <h3>
                    {document.name}
                  </h3>

                  <p className="document-file">
                    {document.file}
                  </p>

                  <p className="document-type">
                    {document.type}
                  </p>

                  {getStatus(
                    document.status
                  )}

                </div>


                {/* ACTIONS */}

                <div className="document-actions">

                  <button
                    className="view-btn"
                    onClick={() =>
                      alert(
                        `Opening ${document.file}`
                      )
                    }
                  >
                    View
                  </button>


                  <button
                    className="download-btn"
                    onClick={() =>
                      alert(
                        `Downloading ${document.file}`
                      )
                    }
                  >
                    Download
                  </button>


                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        document.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>


              </div>

            ))

          )}

        </div>

      </section>


      {/* =================================================
         VERIFICATION INFORMATION
      ================================================= */}

      <section className="verification-card">

        <div className="verification-icon">
          🛡️
        </div>

        <div>

          <h3>
            Document Verification
          </h3>

          <p>
            Verified documents help companies
            trust your academic and professional
            profile. Documents marked as pending
            will be reviewed by the institution.
          </p>

        </div>

      </section>


      {/* =================================================
         UPLOAD MODAL
      ================================================= */}

      {showUpload && (

        <div className="modal-overlay">

          <div className="upload-modal">


            {/* CLOSE */}

            <button
              className="close-btn"
              onClick={() => {
                setShowUpload(false)
                setSelectedType('')
              }}
            >
              ×
            </button>


            <div className="modal-icon">
              📤
            </div>


            <h2>
              Upload Document
            </h2>

            <p>
              Add a new document to your
              student profile.
            </p>


            <form
              onSubmit={handleUpload}
            >


              {/* DOCUMENT TYPE */}

              <label>
                Document Type
              </label>

              <select
                name="documentType"
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(
                    e.target.value
                  )
                }
                required
              >

                <option value="">
                  Select document type
                </option>

                <option value="Resume">
                  Resume
                </option>

                <option value="Certificate">
                  Certificate
                </option>

                <option value="Academic Record">
                  Academic Record
                </option>

                <option value="Internship Report">
                  Internship Report
                </option>

                <option value="Project Document">
                  Project Document
                </option>

              </select>


              {/* FILE */}

              <label>
                Select File
              </label>

              <input
                type="file"
                name="document"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                required
              />


              <p className="file-hint">
                Supported formats: PDF, DOC,
                DOCX, JPG, PNG
              </p>


              {/* BUTTONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowUpload(false)
                    setSelectedType('')
                  }}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="confirm-upload-btn"
                >
                  Upload Document
                </button>

              </div>


            </form>


          </div>

        </div>

      )}

    </div>

  )
}


export default Documents