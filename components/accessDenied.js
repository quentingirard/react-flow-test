export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a
          href="https://wavemind.ch"
          onClick={(e) => {
            e.preventDefault()
            console.log("waiting...")
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
    </>
  )
}