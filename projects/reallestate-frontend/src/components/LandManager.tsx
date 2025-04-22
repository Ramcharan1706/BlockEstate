import React, { useState } from 'react'

const LandManager: React.FC = () => {
  const [token, setToken] = useState<string | null>(null)
  const [documents, setDocuments] = useState<string[]>([])
  const [status, setStatus] = useState<string>('')

  const getAccessToken = async () => {
    try {
      // Replace with your actual API/auth call
      const fakeToken = 'sample-access-token'
      setToken(fakeToken)
      setStatus('Authenticated successfully ✅')
    } catch (error) {
      console.error(error)
      setStatus('Authentication failed ❌')
    }
  }

  const fetchDocuments = async () => {
    try {
      if (!token) return setStatus('No token, please authenticate first.')
      // Replace with actual fetch call
      setDocuments(['Document 1.pdf', 'Land Title A', 'Ownership Receipt'])
      setStatus('Documents fetched ✅')
    } catch (error) {
      console.error(error)
      setStatus('Failed to fetch documents ❌')
    }
  }

  const createAsset = async () => {
    try {
      if (!token) return setStatus('Authenticate first!')
      // Simulate contract logic
      setStatus('Creating land verification asset... ⏳')
      setTimeout(() => {
        setStatus('Asset created successfully ✅')
      }, 1500)
    } catch (error) {
      console.error(error)
      setStatus('Asset creation failed ❌')
    }
  }

  const transferOwnership = async () => {
    try {
      if (!token) return setStatus('Authenticate first!')
      setStatus('Transferring ownership... ⏳')
      setTimeout(() => {
        setStatus('Ownership transferred successfully ✅')
      }, 1500)
    } catch (error) {
      console.error(error)
      setStatus('Transfer failed ❌')
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Land Token Verification & Transfer</h1>

      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">1. Authenticate</h2>
        <button className="btn btn-primary" onClick={getAccessToken}>
          Get Access Token
        </button>
        {token && <p className="mt-2 text-green-600">Token: {token}</p>}
      </section>

      {token && (
        <>
          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">2. User Documents</h2>
            <button className="btn btn-secondary" onClick={fetchDocuments}>
              Fetch Documents
            </button>
            <ul className="list-disc pl-5 mt-2">
              {documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">3. Land Actions</h2>
            <button className="btn m-1" onClick={createAsset}>
              Create Verification Asset
            </button>
            <button className="btn m-1 btn-accent" onClick={transferOwnership}>
              Transfer Ownership
            </button>
          </section>
        </>
      )}

      <p className="mt-4 text-blue-600 font-medium">{status}</p>
    </div>
  )
}

export default LandManager
