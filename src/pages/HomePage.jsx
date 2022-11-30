import { checkPermission } from "api/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // const navigate = useNavigate()
  // useEffect(() => {
  //   const checkTokenIsValid = async () => {
  //     const authToken = localStorage.getItem('authToken')
  //     if (!authToken) {
  //       navigate('/login')
  //     }
  //     const result = await checkPermission(authToken)
  //     if (result) {
  //       navigate('/todo')
  //     }
  //   }
  //   checkTokenIsValid()
  // }, [navigate])
  return (
    <>
      <div>HomePage</div>
    </>
  )

};

export default HomePage;
