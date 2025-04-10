import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; 


function Login() {
  const navigate = useNavigate();

  return (
      <GoogleLogin
        onSuccess={(res) => {
          const decoded = jwtDecode(res.credential);
          console.log("Decoded User:", decoded);
          localStorage.setItem("user",res.credential)
          
          navigate('/home',{state:{user: decoded}}); 
        }}
      />
  );
}

export default Login;
