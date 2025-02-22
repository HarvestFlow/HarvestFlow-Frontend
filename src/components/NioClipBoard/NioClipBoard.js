import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default function NioClipBoard({ text = "https://www.uscreen.tv/careers....." }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="position-relative d-flex justify-content-between align-items-center gap-3 py-1 px-3 mb-3 rounded-2 border">
      <pre className="fs-16 opacity-50 m-0 overflow-hidden language-html" id="copy-link">
        <code>{text}</code>
      </pre>
      <div className="js-copy-wrap">
        <CopyToClipboard text={text} onCopy={handleCopy}>
          <button className={`border-0 outline-0 bg-transparent fs-16 fw-semibold text-capitalize text-${copied ? 'success' : 'primary'} `}>
            {copied ? 'copied' : 'copy'}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}


