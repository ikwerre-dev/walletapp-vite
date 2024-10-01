import React, { useState } from 'react';

const ShareButton = () => {
  const [result, setResult] = useState('');

  const shareData = {
    title: 'MDN',
    text: 'Learn web development on MDN!',
    url: 'https://developer.mozilla.org',
  };

  const handleShare = async () => {
    try {
      await navigator.share(shareData);
      setResult('MDN shared successfully');
    } catch (err) {
      setResult(`Error: ${err}`);
    }
  };

  return (
    <div>
      <button
        onClick={handleShare}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Share MDN
      </button>
      <p className="result mt-2">{result}</p>
    </div>
  );
};

export default ShareButton;
