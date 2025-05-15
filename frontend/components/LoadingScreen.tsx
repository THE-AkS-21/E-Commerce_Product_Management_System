import { useEffect, useState } from "react";
import type {LoadingScreenProps} from "~/constants";

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [text, setText] = useState<string>("");
    const fullText = "COSMOS";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;

            if (index > fullText.length) {
                clearInterval(interval);
                setTimeout(() => {
                    onComplete();
                }, 100);
            }
        }, 200);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-white text-gray-600 flex flex-col items-center justify-center">
            <div className="mb-4 text-4xl font-mono font-bold">
                {text} <span className="animate-blink ml-1 text-gray-800">|</span>
            </div>

            <div className="w-[200px] h-[2px] rounded relative overflow-hidden">
                <div className="w-[40%] h-full shadow-[0_0_15px_#3b82f6] text-primary-100 animate-loading-bar"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
