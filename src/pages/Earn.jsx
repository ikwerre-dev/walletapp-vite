import React, { useState } from 'react';

const DepositProofUploader = () => {
    const [proof, setProof] = useState(""); // To hold the base64 encoded image

    const handleProofChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProof(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className="">
                <label htmlFor="proof" className='text-xs'>Upload Proof of Deposit</label>
                <input
                    type="file"
                    name='proof'
                    id="proof"
                    accept="image/*" 
                    className="w-full text-xs"
                    title="Enter Proof of Deposit"
                    onChange={handleProofChange} 
                />
            </div>
            {proof && (
                <div className="mt-4">
                    <img src={proof} alt="Proof of deposit preview" className="w-full h-auto" />
                </div>
            )}
        </div>
    );
};

export default DepositProofUploader;