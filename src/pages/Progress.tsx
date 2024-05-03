import { levelDescription } from "../components/levelDescription";

export const ProgressBar = () => {
    const progress = 5; 
    
    return (
        <div className="lg:ml-64 mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="relative wrap overflow-hidden">
                    <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
                    {levelDescription.map((level, index) => {
                        return (
                            index % 2 ?
                                    <div className="mb-8 flex justify-between items-center w-full right-timeline" key={index}>
                                        <div className="order-1 w-5/12"></div>
                                        <div className={`z-20 flex items-center order-1 ${index < progress ? 'bg-green-800' : 'bg-gray-800' }  shadow-xl w-12 h-12 rounded-full`}>
                                            <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
                                        </div>
                                        <div className={`order-1 ${index < progress ? 'bg-green-700' : 'bg-gray-400' }  rounded-lg shadow-xl w-5/12 px-6 py-4`}>
                                            <h3 className={`mb-3 font-bold ${index < progress ? 'text-white' : 'text-gray-800' }  text-xl`}>{level.title}</h3>
                                            <p className={`${index < progress ? 'text-white' : 'text-gray-700' }  leading-tight`}>{level.description}</p>
                                        </div>
                                    </div> :

                                    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline" key={index}>
                                        <div className="order-1 w-5/12"></div>
                                        <div className={`z-20 flex items-center order-1 ${index < progress ? 'bg-green-800' : 'bg-gray-800' }  shadow-xl w-12 h-12 rounded-full`}>
                                            <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
                                        </div>
                                        <div className={`order-1 ${index < progress ? 'bg-green-700' : 'bg-gray-400' }  rounded-lg shadow-xl w-5/12 px-6 py-4`}>
                                            <h3 className={`mb-3 font-bold ${index < progress ? 'text-white' : 'text-gray-800' }  text-xl`}>{level.title}</h3>
                                            <p className={`${index < progress ? 'text-white' : 'text-gray-700' }  leading-tight`}>{level.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                </div>
            </div>
        </div>
    );
};
