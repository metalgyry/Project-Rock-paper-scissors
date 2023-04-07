import React from 'react'
import st from './ErrorMessage.module.css';

export default function ErrorMessage ({error}) {
  const rootClass = [st.error_message];
  if (!(error === "")) {
    rootClass.push(st.error_message_border);
  }

  return (
    <div className={rootClass.join(" ")}>{error}</div>
  )
}
