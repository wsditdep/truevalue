"use client";

import React, { useEffect } from 'react';

const LiveChatScript = () => {
  useEffect(() => {
    window.__lc = window.__lc || {};
    window.__lc.license = 18943985;

    const initLiveChat = () => {
      const script = document.createElement('script');
      script.async = true;
      script.type = 'text/javascript';
      script.src = 'https://cdn.livechatinc.com/tracking.js';
      document.head.appendChild(script);
    };

    if (!window.__lc.asyncInit) {
      initLiveChat();
      window.LiveChatWidget = window.LiveChatWidget || { _q: [] };
    }
  }, []);

  return null;
};

const LiveSupport = () => {
  return (
    <div className="live-support-wrapper">
      <LiveChatScript />
      <noscript>
        <a href="https://www.livechat.com/chat-with/18943985/" rel="nofollow">
          Chat with us
        </a>, powered by{' '}
        <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">
          LiveChat
        </a>
      </noscript>
    </div>
  );
};

export default LiveSupport;