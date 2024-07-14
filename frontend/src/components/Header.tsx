import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="h-10 w-full flex justify-between items-center">
      <Link to={'/'}>This is the Logo</Link>
        <p>This is another thing</p>       
    </div>
  )
}

export default Header
