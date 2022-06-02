import './profile.css'
import { Link } from 'react-router-dom'
export const ProfileLogo = () => {
  return (
    <div className="profile">
        <span id="profile_pic">A</span>
        <h2>name : Admin</h2>
        <h3>email : Admin@thbs.com</h3>
        <Link to={"/"} className="logoutSpan" onClick={()=>{localStorage.clear()}}>
            <span>logout</span>
          </Link>
    </div>
  )
}
