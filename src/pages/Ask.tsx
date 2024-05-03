import { useState } from 'react';
import ReactQuill from 'react-quill';
import { TagsInput } from "react-tag-input-component";
import 'react-quill/dist/quill.snow.css';
import { modules } from "../components/quillModules";
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { LoginAlert } from '../components/LoginAlert';


export const Ask = () => {

    const [title,setTitle] = useState('');
    const [value,setValue] = useState('');
    const [tags, setTags] = useState([]);
    const [logout,setLogout] = useState(false);

    const [alert,setAlert] = useState("");
    const [message,setMessage] = useState("");
    const [close,setClose] = useState(false)

    const navigate = useNavigate();

    const headers = {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json'
      };

    
function Altert(){
    return(
        <div id="alert-2" className={`${close ? 'hidden' : 'flex'}  items-center p-4 text-red-800 rounded-lg bg-red-50 `} role="alert">
            
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">
                {message}
            </div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close" onClick={()=>{
                setClose(true);
            }}>
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
        )
    }

    return(
        <div className="lg:ml-64 mt-16">
            {logout && <LoginAlert />}
            <div className="flex flex-col gap-4 relative z-10 p-4">
                <div className="text-2xl font-bold">Ask a public question</div>
                <div className="bg-green-200 border border-green-400 p-5 flex flex-col gap-2 rounded-md">
                    <div className="text-xl font-semibold">Writing a good question</div>
                    <div className="text-sm">
                        You’re ready to ask a programming-related question and this form will help guide you through the process.<br />
                        Looking to ask a non-programming question? See the topics here to find a relevant site.
                    </div>
                    <div className="text-xs">
                        <div>Steps</div>
                        <ul className="list-inside list-disc flex flex-col gap-1 pl-4">
                            <li>Summarize your problem in a one-line title.</li>
                            <li>Describe your problem in more detail.</li>
                            <li>Describe what you tried and what you expected to happen.</li>
                            <li>Add “tags” which help surface your question to members of the community.</li>
                            <li>Review your question and post it to the site.</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border border-blue-200 p-5">
                    <div className="font-semibold">Title</div>
                    <div className="text-xs font-light">Be specific and imagine you’re asking a question to another person.</div>
                    {alert == "title" && <Altert />}
                    <div className="border p-1 rounded-md">
                        <input className="w-full px-2 font-extralights text-sm focus:outline-none" onChange={(e)=>{
                            setTitle(e.target.value);
                        }} type="text" placeholder="e.g. Is there an R function for finding the index of an element in a vector?"/>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border border-blue-200 p-5">
                    <div className="font-semibold">What are the details of your problem?</div>
                    <div className="text-xs font-light">Introduce the problem and expand on what you put in the title. Minimum 20 characters.</div>
                    {alert == "value" && <Altert />}
                    <div className="border p-1 rounded-md h-[300px]">
                        <ReactQuill className='h-[200px]' theme="snow" value={value} modules={modules} onChange={setValue} />
                    </div>
                </div>

                <div className="flex flex-col gap-2 border border-blue-200 p-5">
                    <div className="font-semibold">Tags</div>
                    <div className="text-xs font-light">Add 3 tags to describe what your question is about</div>
                    {alert == "tags" && <Altert />}
                    <TagsInput
                        value={tags}
                        onChange={setTags}
                        placeHolder="Enter tags"
                    />
                    <div className='text-xs text-gray-700'>press enter to add new tag</div>
                </div>
                <div className='flex justify-center gap-2'>

                <button className='bg-green-700 px-2 text-white py-1 mb-2' onClick={()=>{
                    if(title.length < 20){
                        setAlert("title")
                        setMessage("Title must be at least 30 characters long.")
                        setClose(false)
                    }
                    else if(value.length < 100){
                        setAlert("value")
                        setMessage("Please provide a detailed explanation comprising at least 100 characters to ensure clarity and comprehensiveness.")
                        setClose(false)
                    }
                    else if(tags.length < 3){
                        setAlert("tags")
                        setMessage("Please include exact 3 relevant tags for your question.")
                        setClose(false)
                    }
                    else{
                        try{
                            axios.post(`${BACKEND_URL}/api/v1/questions`,{
                                "title":title,
                                "content":value
                            }, { headers }).then(()=>{
                                navigate("/questions")
                            }).catch(() => {
                                setLogout(true);
                            });
                            }catch(e){
                                setLogout(true);
                            }
                    }
                }}>Submit</button>
                </div>
            </div>
        </div>
    )
}
