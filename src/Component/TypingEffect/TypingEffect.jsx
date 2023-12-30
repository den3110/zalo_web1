import React from 'react'
import "./style.sass"

const TypingEffect = (props) => {
  return (
    <div className={"dksfjkdjfkjdaskss"} style={{display: "flex", alignItems: "center", gap: 10., position: "absolute", bottom: "100%", left: 0, zIndex: 10, padding: 5, background: "#fff"}}>
        <div>{props.userTyping} đang nhập</div>
      <div className="ticontainer">
        <div className="tiblock">
            <div className="tidot"></div>
            <div className="tidot"></div>
            <div className="tidot"></div>
        </div>
        </div>
    </div>
  )
}

export default TypingEffect
