import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";

const HomePage = () => {
  let location = useLocation()
  console.log(location);
  return (
    <>
      <div>HomePage</div>
      <Link to="/todo">todos</Link>
    </>
  )

};

export default HomePage;
