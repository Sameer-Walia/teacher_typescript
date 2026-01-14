import { Link } from 'react-router-dom'

function Header()
{

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top" id="header">
        <div className="container">
          <Link to="/" className="navbar-brand col-3" ><h3><span><i className="fa-regular fa-clone"></i></span> Excellence</h3></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item sameer">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/nothanks" className="nav-link">Resend Email</Link>
              </li>
            </ul>
            <Link to="/login" className="btn btn1 mx-3">Login</Link>
            <Link to="/register" className="btn btn1 ">Register</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
