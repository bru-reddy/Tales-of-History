import React from "react";
import {createRoot} from "react-dom/client";

const root=document.getElementById("root");

function showError(error){
  const message=String(error?.stack||error||"Unknown frontend error");
  root.innerHTML=`
    <div style="min-height:100vh;display:grid;place-items:center;padding:32px;background:#f5f0e7;font-family:system-ui,sans-serif;color:#242527">
      <div style="max-width:760px;background:#fffdf8;border:1px solid #ddd3c4;border-radius:18px;padding:32px;box-shadow:0 18px 40px rgba(40,30,20,.10)">
        <div style="font-size:11px;letter-spacing:.16em;font-weight:700;color:#8a6b32">TALES OF HISTORY</div>
        <h1 style="font-family:Georgia,serif;margin:10px 0">Frontend failed to start</h1>
        <p style="color:#666">The deployment loaded, but the application encountered an error while starting.</p>
        <pre style="white-space:pre-wrap;font-size:12px;background:#f3eee5;padding:16px;border-radius:10px;overflow:auto">${message.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>
        <button onclick="location.reload()" style="margin-top:14px;padding:11px 16px;border:0;border-radius:10px;background:#242527;color:#fff;cursor:pointer">Reload</button>
      </div>
    </div>`;
}

window.addEventListener("error",event=>showError(event.error||event.message));
window.addEventListener("unhandledrejection",event=>showError(event.reason));

import("./main.jsx").catch(showError);
