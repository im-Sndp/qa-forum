import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { formatDateDifference } from "../components/formatDateDifference";

export const Home = () => {

    const [loading,setLoading] = useState(true);
    const [questions,setQuestions] = useState([]);

    const headers = {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json'
    };

    useEffect(()=>{
        try{
        axios.get(`${BACKEND_URL}/api/v1/questions`,{ headers }).then(response =>{
            setQuestions(response.data.questions);
            setLoading(false)
        }).catch((error)=>{
            window.location.href = '/';
        })}catch(error){
            window.location.href = '/';
        }
    },[])

    if(loading){
        return(
            <div className="lg:ml-64 mt-16">
                <div role="status" className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return(
        <div className="lg:ml-64 mt-16">
            {}
            <div className="p-2 divide-y">
                {questions.map((question)=>{
                    return(
                        <DisplayQuestion key={question.id} question={question} />
                    )
                })}
            </div>
        </div>
    )
}

function removeHtmlTags(input) {
    return input.replace(/<[^>]*>/g, '');
}

const DisplayQuestion = ({key,question}) => {

    const navigate = useNavigate();

    return(
        <div key={key} className="pt-2 lg:p-2 gap-2 lg:flex-row flex justify-between">
            <div>
            <div className="font-semibold text-blue-900 cursor-pointer flex flex-wrap" onClick={()=>{
                navigate(`/questions/${question.id}`)
            }}>{question.title}</div>
            <div className="w-[200px] sm:w-full text-sm text-slate-500">
                <div className="line-clamp-2 lg:line-clamp-1 overflow-ellipsis">{removeHtmlTags(question.content)}</div>
            </div>
            <div className="my-4 lg:my-2 flex flex-col-reverse lg:flex-row lg:items-center gap-2 text-xs">
                <div className="flex flex-col lg:flex-row lg:items-center items-end lg:gap-2 justify-end">
                    <img className="h-8 w-8 hidden lg:block" src="https://source.unsplash.com/random/?avatar-logo&1" alt="profile" />
                    <div className="text-blue-900 cursor-pointer">-{`${question.author.firstname} ${question.author.lastname}`}</div>
                    <div className="bg-violet-800 text-white px-1 hidden lg:block">Developer</div>
                    <div className="text-gray-500">Asked {formatDateDifference(question.publishedDate)} ago</div>
                </div>
                <ul className="flex gap-1">
                    <li className="border border-gray-700 rounded-full px-1">Python</li>
                    <li className="border border-gray-700 rounded-full px-1">AWS</li>
                    <li className="border border-gray-700 rounded-full px-1">boto 3</li>
                </ul>
            </div>
        </div>
        <div className="lg:flex gap-5">
            <div className="flex flex-col items-center">
                <div className="border bg-slate-100 w-10 flex justify-center items-center rounded-full h-10">
                    <span>12</span>
                </div>
                <div>Views</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="border bg-slate-100 w-10 flex justify-center items-center rounded-full h-10">
                    <span>2</span>
                </div>
                <div>Answer</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="border bg-slate-100 w-10 flex items-center justify-center rounded-full h-10">
                    <span>12</span>
                </div>
                <div>Votes</div>
            </div>
        </div>
    </div>
    )
}