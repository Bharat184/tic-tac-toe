import React from 'react';
function Message(props) {
  return <>
   <div id="message" style={{background:props.bg}}>
     <h1>{props.msg}</h1>
   </div>
  </>;
}

export default Message;
