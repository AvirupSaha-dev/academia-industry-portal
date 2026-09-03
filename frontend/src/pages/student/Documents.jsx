import { useEffect, useState } from 'react'
import './Documents.css'

const DB_NAME = 'AcademiaIndustryDocuments'
const STORE_NAME = 'documents'


function openDatabase() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(DB_NAME, 1)


    request.onupgradeneeded = () => {

      const db = request.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {

        db.createObjectStore(
          STORE_NAME,
          {
            keyPath: 'id'
          }
        )

      }

    }


    request.onsuccess = () => {

      resolve(request.result)

    }


    request.onerror = () => {

      reject(request.error)

    }

  })

}


function Documents({ onNavigate }) {

  const [documents, setDocuments] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [selectedType, setSelectedType] =
    useState('All')


  /* =========================
     LOAD DOCUMENTS
  ========================= */

  const loadDocuments = async () => {

    try {

      const db =
        await openDatabase()

      const transaction =
        db.transaction(
          STORE_NAME,
          'readonly'
        )

      const store =
        transaction.objectStore(
          STORE_NAME
        )

      const request =
        store.getAll()

      request.onsuccess = () => {

        const result =
          request.result || []

        result.sort(
          (a, b) =>
            b.createdAt - a.createdAt
        )

        setDocuments(result)
        setLoading(false)

      }

    } catch (error) {

      console.error(
        'Failed to load documents:',
        error
      )

      setLoading(false)

    }

  }


  useEffect(() => {

    loadDocuments()

  }, [])


  /* =========================
     UPLOAD
  ========================= */

  const handleUpload = async (e) => {

    const file =
      e.target.files?.[0]

    if (!file) return


    const allowedTypes = [

      'application/pdf',

      'application/msword',

      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

      'image/jpeg',

      'image/png'

    ]


    if (!allowedTypes.includes(file.type)) {

      alert(
        'Please upload PDF, DOC, DOCX, JPG or PNG files.'
      )

      e.target.value = ''
      return

    }


    if (file.size > 10 * 1024 * 1024) {

      alert(
        'File size must be less than 10 MB.'
      )

      e.target.value = ''
      return

    }


    const type =
      file.name
        .toLowerCase()
        .includes('resume')
        ? 'Resume'
        : file.name
            .toLowerCase()
            .includes('cv')
          ? 'Resume'
          : 'Document'


    const document = {

      id:
        `document-${Date.now()}`,

      name:
        file.name,

      type,

      size:
        file.size,

      mimeType:
        file.type,

      createdAt:
        Date.now(),

      file

    }


    try {

      const db =
        await openDatabase()

      const transaction =
        db.transaction(
          STORE_NAME,
          'readwrite'
        )

      const store =
        transaction.objectStore(
          STORE_NAME
        )

      store.put(document)


      transaction.oncomplete = () => {

        loadDocuments()

        alert(
          'Document uploaded successfully!'
        )

      }


      transaction.onerror = () => {

        alert(
          'Failed to save document.'
        )

      }

    } catch (error) {

      console.error(
        'Upload failed:',
        error
      )

      alert(
        'Something went wrong while uploading.'
      )

    }


    e.target.value = ''

  }


  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this document?'
      )

    if (!confirmed) return


    try {

      const db =
        await openDatabase()

      const transaction =
        db.transaction(
          STORE_NAME,
          'readwrite'
        )

      const store =
        transaction.objectStore(
          STORE_NAME
        )

      store.delete(id)


      transaction.oncomplete = () => {

        loadDocuments()

      }

    } catch (error) {

      console.error(
        'Failed to delete document:',
        error
      )

    }

  }


  /* =========================
     DOWNLOAD
  ========================= */

  const handleDownload = (document) => {

    if (!document.file) {

      alert(
        'File is not available.'
      )

      return

    }


    const url =
      URL.createObjectURL(
        document.file
      )

    const anchor =
      window.document.createElement('a')

    anchor.href = url
    anchor.download = document.name

    window.document.body.appendChild(
      anchor
    )

    anchor.click()

    anchor.remove()

    URL.revokeObjectURL(url)

  }


  /* =========================
     PREVIEW
  ========================= */

  const handlePreview = (document) => {

    if (!document.file) return


    if (
      document.mimeType !==
        'application/pdf' &&
      !document.mimeType.startsWith('image/')
    ) {

      alert(
        'Preview is available for PDF and image files. Use Download for this document.'
      )

      return

    }


    const url =
      URL.createObjectURL(
        document.file
      )

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    )

  }


  /* =========================
     FORMAT SIZE
  ========================= */

  const formatSize = (bytes) => {

    if (!bytes) return '0 KB'

    if (bytes < 1024 * 1024) {

      return (
        Math.round(
          bytes / 1024
        ) + ' KB'
      )

    }

    return (
      (
        bytes /
        (1024 * 1024)
      ).toFixed(1) +
      ' MB'
    )

  }


  /* =========================
     FORMAT DATE
  ========================= */

  const formatDate = (date) => {

    return new Date(date)
      .toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      )

  }


  const filteredDocuments =
    selectedType === 'All'
      ? documents
      : documents.filter(
          document =>
            document.type ===
            selectedType
        )


  return (

    <div className="documents-page">

      {/* HEADER */}

      <div className="documents-header">

        <div>

          <p className="page-tag">
            📁 DOCUMENT MANAGEMENT
          </p>

          <h1>
            My Documents
          </h1>

          <p className="page-description">
            Store and manage your resume,
            certificates and important documents.
          </p>

        </div>


        <label className="upload-document-btn">

          + Upload Document

          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleUpload}
          />

        </label>

      </div>


      {/* INFO */}

      <section className="documents-info-card">

        <div className="documents-info-icon">
          📄
        </div>

        <div>

          <h2>
            Keep your documents ready
          </h2>

          <p>
            Upload your latest resume,
            certificates and other career
            documents for easy access.
          </p>

        </div>

      </section>


      {/* FILTER */}

      <div className="documents-toolbar">

        <div>

          <h2>
            Your Documents
          </h2>

          <span>
            {documents.length} document
            {documents.length !== 1
              ? 's'
              : ''}
          </span>

        </div>


        <select
          value={selectedType}
          onChange={(e) =>
            setSelectedType(
              e.target.value
            )
          }
        >

          <option value="All">
            All Documents
          </option>

          <option value="Resume">
            Resume
          </option>

          <option value="Document">
            Documents
          </option>

        </select>

      </div>


      {/* DOCUMENT LIST */}

      {loading ? (

        <div className="documents-empty">

          <div>
            ⏳
          </div>

          <h3>
            Loading documents...
          </h3>

        </div>

      ) : filteredDocuments.length === 0 ? (

        <div className="documents-empty">

          <div>
            📂
          </div>

          <h3>
            No documents found
          </h3>

          <p>
            Upload your resume or certificates
            to get started.
          </p>

          <label className="empty-upload-btn">

            + Upload Document

            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleUpload}
            />

          </label>

        </div>

      ) : (

        <div className="documents-grid">

          {filteredDocuments.map(
            document => (

              <div
                className="document-card"
                key={document.id}
              >

                <div className="document-top">

                  <div className="document-icon">
                    {document.mimeType ===
                    'application/pdf'
                      ? '📕'
                      : document.mimeType.startsWith(
                          'image/'
                        )
                        ? '🖼️'
                        : '📄'}
                  </div>

                  <span className="document-type">
                    {document.type}
                  </span>

                </div>


                <h3>
                  {document.name}
                </h3>


                <div className="document-meta">

                  <span>
                    📦 {formatSize(
                      document.size
                    )}
                  </span>

                  <span>
                    📅 {formatDate(
                      document.createdAt
                    )}
                  </span>

                </div>


                <div className="document-actions">

                  <button
                    type="button"
                    onClick={() =>
                      handlePreview(
                        document
                      )
                    }
                  >
                    Preview
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(
                        document
                      )
                    }
                  >
                    Download
                  </button>

                  <button
                    type="button"
                    className="delete-document-btn"
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

            )
          )}

        </div>

      )}

    </div>

  )
}

export default Documents