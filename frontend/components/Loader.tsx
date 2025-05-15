import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid rounded-full border-t-transparent border-primary-600" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
