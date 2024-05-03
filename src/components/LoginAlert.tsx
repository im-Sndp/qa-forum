export const LoginAlert = () => {

    return(
        <div className='bg-black bg-opacity-50 z-50 fixed w-screen h-screen top-0 right-0'>
            <div className="fixed inset-0 flex justify-center items-center text-white">
                <div>
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-red-600 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-red-700 ">Authentication failed. Please re-authenticate to continue.</h3>
                            <button data-modal-hide="popup-modal" type="button" className="text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={()=>{
                                window.location.href = '/signin';
                            }}>
                                Sign In
                            </button>
                            <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 bg-green-900 hover:bg-green-700 text-sm font-medium text-white focus:outline-none rounded-lg  hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" onClick={()=>{
                                window.location.href = '/';
                            }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}