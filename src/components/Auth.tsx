import { ChangeEvent , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type } : {type: "signup" | "signin"}) => {

    const navigate = useNavigate();

    interface SignupInput {
        firstname: string,
        lastname: string,
        email: string,
        password: string
    }

    const [postInput , setPostInputs] = useState<SignupInput>({
        firstname: "",
        lastname:"",
        email: "",
        password: ""
    })

    const [visibility,setVisibility] = useState(false);

    async function sendRequest(){
        try{
            const response  = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`,postInput);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            window.location.href = '/';
        }catch(e){
            setVisibility(true);
        }
    }

    return(
        <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center">
            <div className="sm:w-1/2">
                <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold">Create an account</div>
                    <div className="text-md font-light text-slate-500">
                        {type === "signin" ? "Don't have  an account? " : "Already have an account? "}
                        <Link className="underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : " Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                    
                    {type ==="signup" && <InputBox lable="First Name" placeholder="Enter your first username" onChange={(e) => {
                        setPostInputs({
                            ...postInput,
                            firstname: e.target.value
                        })
                    }} />}

                    {type ==="signup" && <InputBox lable="Last Name" placeholder="Enter your last username" onChange={(e) => {
                        setPostInputs({
                            ...postInput,
                            lastname: e.target.value
                        })
                    }} />}

                    <InputBox lable="Email" type="email" placeholder="m@example.com" onChange={(e) => {
                        setPostInputs({
                            ...postInput,
                            email: e.target.value
                        })
                    }} />

                    <InputBox lable="password" type="password" placeholder="" onChange={(e) => {
                        setPostInputs({
                            ...postInput,
                            password: e.target.value
                        })
                    }} />
                </div>
                <div id="alert-additional-content-2" className={`${!visibility && "hidden"} p-4 my-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800`} role="alert">
                    <div className="flex items-center">
                        <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>
                        <h3 className="text-lg font-medium">Invalid credentials</h3>
                    </div>
                    <div className="mt-2 mb-4 text-sm">
                        Your authentication has failed . Please provide correct credentials to continnue . 
                    </div>
                    <div className="flex">
                        <button type="button" onClick={()=>{
                            setVisibility(false);
                        }} className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
                            Dismiss
                        </button>
                    </div>
                </div>
                <button onClick={sendRequest} className="w-full bg-black text-white p-2 rounded-md text-center mt-5">{type === "signup" ? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    )
}

interface laballedInputType {
    lable: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputBox({lable ,placeholder , onChange , type} : laballedInputType){
    return(
        <>
            <div className="font-bold">{lable}</div>
            <div onChange={onChange}>
                <input type={type || ""} placeholder={placeholder} className="rounded-md border w-full p-2" />
            </div>
        </>
    )
}