import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const loginData = await fetch("https://notes-man-backend.vercel.app/api/auth/login",{
            method : "POST",
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email: credentials.email,password : credentials.password})
        })
        // eslint-disable-next-line
        const json = await loginData.json();
        if (json.success){
            // redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.displayAlert("Logged in Successfully","success");
        }
        else{
            props.displayAlert("Invalid credentials","danger");
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container p-3 border rounded w-50' style={{marginTop:"5rem",boxShadow:".25rem .25rem .5rem grey"}}>
            <h2 className='text-center mb-2 mt-3'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 container">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 container">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={8}/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login