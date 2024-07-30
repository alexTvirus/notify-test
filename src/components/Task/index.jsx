import { useState } from "react"
import "./style.scss"
import { CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons"

const Task = (props) => {
    let {  name, notifyAt, id } = props.data
    let { isNotify, handleRemove } = props
    return (<>
        <div className={(isNotify ? "notify-high-light" : "") + " task"} key={id}>
            <div>
                <p className="task__name content-overflow">{name}</p>
                <p className="task__name content-overflow">{notifyAt}</p>
            </div>
            <div className="task__btn-group">
                <button className="task__remove-btn" onClick={() => handleRemove(id)}><DeleteOutlined /></button>
            </div>
        </div>

    </>)
}

export default Task