import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from "../components/quillModules";
import { LoginAlert } from "../components/LoginAlert";
import { formatDateDifference } from "../components/formatDateDifference";

const headers = {
    'Authorization': localStorage.getItem("token"),
    'Content-Type': 'application/json'
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate.replace(',', ' at');
};


const CommentSection = ({ comments }) => {
    return (
        <div className="divide-y my-1 ml-24 mr-6 px-2 border-t">
            {comments.map((comment) => (
                <div className="text-xs text-gray-700 py-1" key={comment.id}>
                    {comment.content}
                    <span className="bg-blue-50 text-blue-500">  - {(comment.author.firstname + " " + comment.author.lastname).toString() }</span>
                    <span className="text-gray-300"> {formatDate(comment.createdAt)}</span>
                </div>
            ))}
        </div>
    );
};

const CommentInput = ({ value, setValue, onSubmit }) => {
    return (
        <div className="border pl-1 my-1 flex ml-24 mr-6">
            <input className="w-full text-xs placeholder:text-xs focus:outline-none" type="text" value={value} placeholder="comment" onChange={(e) => setValue(e.target.value)} />
            <button className="text-xs text-white bg-blue-900" onClick={onSubmit}>Comment</button>
        </div>
    );
};

const Question = () => {
    
    interface Author {
        id: string;
        firstname: string;
        lastname: string;
    }
    
    interface AnswerComment {
        id: string;
        content: string;
        createdAt: string;
        author: Author;
    }
    
    interface Answer {
        id: string;
        content: string;
        createdAt: string;
        author: Author;
        answerComment: AnswerComment[];
    }
    
    interface QuestionComment {
        id: string;
        content: string;
        createdAt: string;
        author: Author;
    }
    
    interface Question {
        id: string;
        title: string;
        content: string;
        publishedDate: string;
        author: Author;
        answer: Answer[];
        questionComment: QuestionComment[];
    }    
    
    const id = useParams()["id"];
    const [question, setQuestion] = useState<Question | null>(null);;
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('');
    const [qcomment, setQComment] = useState('');
    const [click, setClick] = useState(false);
    const [logout, setLogout] = useState(false);
    const [comment, setComment] = useState(false);
    const [list, setList] = useState([]);



    useEffect(() => {
        try{
            axios.get(`${BACKEND_URL}/api/v1/questions/` + id, { headers })
                .then(response => {
                    setQuestion(response.data.question);
                    setList(Array(parseInt(response.data.question.answer.length)).fill(''));
                    setLoading(false);
                }).catch( ()=> {
                    window.location.href = '/';
                });}
        catch(error){
            window.location.href = '/';
        }
    }, [click]);
    
    const handleInput = (e, index) => {
        const newArray = [...list];
        newArray[index] = e.target.value;
        setList(newArray);
    };

    const removeInput = (index)  => {
        const newArray = [...list];
        newArray[index] = "";
        setList(newArray);
    };

    const handleQuestionCommentSubmit = () => {
        if (qcomment.length > 0) {
            axios.post(`${BACKEND_URL}/api/v1/comment/question/${id}`, { "content": qcomment }, { headers })
                .then((response) => {
                    if (response.status === 200) {
                        setClick(!click);
                        setQComment("");
                    }
                });
        }
    };

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

    return (
        <div className="lg:ml-64 mt-16">
            {logout && <LoginAlert />}
            <div className="p-4 border">
                <div className="text-2xl font-semibold">{question.title}</div>
                <div className="p-1 flex text-xs items-center gap-2">
                    <img className="h-8 w-8" src="https://source.unsplash.com/random/?avatar-logo&1" alt="profile" />
                    <div className="text-blue-900 cursor-pointer">{`-${question.author.firstname} ${question.author.lastname}`}</div>
                    <div className="bg-violet-900 text-white px-1 font-light">Developer</div>
                    <div className="text-gray-500">{formatDateDifference(question.publishedDate)}</div>
                </div>
            </div>
            <div className="p-2 text-sm border">
                <div className="md:flex gap-2">
                    <div className="flex justify-end md:justify-normal md:flex-col items-center gap-2 md:gap-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="lightgray" className="w-8 h-8 border border-gray-300 rounded-full cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                        <div className="text-lg">50</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="lightgray" className="w-8 h-8 border border-gray-300 rounded-full cursor-pointer rotate-[180deg]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>

                    </div>
                    <div className="pl-1"><div dangerouslySetInnerHTML={{ __html: question.content }} /></div>
                </div>
                <CommentSection comments={question.questionComment} />
                <CommentInput value={qcomment} setValue={setQComment} onSubmit={handleQuestionCommentSubmit} />
            </div>
            <div className="pl-5">
                <div className="text-xl py-1">{question.answer.length} Answers</div>
                <div className="divide-y pl-5 pr-1">
                    {question.answer.map((answer, index) => (
                        <div className="p-2 text-sm" key={index}>
                            <div className="flex gap-2">
                                <div className="flex flex-col items-center gap-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="lightgray" className="w-6 h-6 border border-gray-300 rounded-full cursor-pointer">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                    </svg>
                                    <div className="text-md">5</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="lightgray" className="w-6 h-6 border border-gray-300 rounded-full cursor-pointer rotate-[180deg]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                    </svg>

                                </div>
                                <div className="w-full">
                                <div dangerouslySetInnerHTML={{ __html: answer.content }} /></div>
                            </div>
                            <CommentSection comments={answer.answerComment} />

                            <div className="border pl-1 my-1 flex ml-24 mr-6">
                                <input className="w-full text-xs placeholder:text-xs focus:outline-none" type="text" value={list[index]} placeholder="comment" onChange={(e)=>{
                                    handleInput(e,index)
                                }}/>
                                <button className={`text-xs text-white bg-blue-900 ${comment && 'pointer-events-none'}`} onClick={()=>{
                                    if(list[index].length > 0){
                                        setComment(true);
                                        axios.post(`${BACKEND_URL}/api/v1/comment/answer`,{
                                            "content" : list[index],
                                            "answerId":answer.id
                                        },{ headers }).then((response)=>{
                                            if(response.status == 200){
                                                setClick(!click);
                                                removeInput("");
                                                setComment(false);
                                            }
                                        })
                                    }
                                }}>Comment</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-5 pb-8">
                <div className="md:border my-4 p-1 rounded-md h-[300px]">
                    <div className="text-2xl py-2">Your Answer</div>
                    <ReactQuill className='h-[200px]' theme="snow" value={value} modules={modules} onChange={setValue} />
                </div>
                <div className="w-full flex justify-end">
                    <button className="bg-green-700 mt-4 lg:mt-2 text-white px-2 text-sm py-1" onClick={() => {
                        try {
                            axios.post(`${BACKEND_URL}/api/v1/answer/${id}`, { "content": value }, { headers })
                                .then(() => {
                                    setClick(!click);
                                    setValue("");
                                }).catch(() => {
                                    setLogout(true);
                                });
                        } catch (e) {
                            setLogout(true);
                        }
                    }}>Post Your Answer</button>
                </div>
            </div>
        </div>
    );
};

export default Question;
