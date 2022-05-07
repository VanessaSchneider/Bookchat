function Logout ({ handleLogout }) {
  return (
    <header>
      <button
        type='button'
        className='btn btn-outline-danger'
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  )
}

export default Logout

    
    