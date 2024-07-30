import { useRef, useState } from "react"
import { Button, Checkbox, Form, Input } from 'antd';
import { PlusCircleOutlined } from "@ant-design/icons";
import "./style.scss"

const FormInputTask = (props) => {
    const [form] = Form.useForm();
    const { handleAdd } = props
    const [inputVale, setInputValue] = useState("")

    const handleOnchageInput = (e) => {
        setInputValue(e.target.value)
    }

    const prehandleSubmit = (e) => {
        handleAdd(e.taskName)
        console.log("1 "+inputVale)
        form.setFieldValue({
            taskName: ""
        })
        setInputValue("")
        console.log("2 "+inputVale)
    }

    return (<>

        <Form form={form} className="todoApp--header__form" onFinish={prehandleSubmit}>
            <Form.Item
                className="todoApp--header__task-name-input"
                name="taskName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Task Name!',
                    },
                ]}
            >
                <Input placeholder="Task Name" value={inputVale}
                    onChange={handleOnchageInput}
                />
            </Form.Item>
            <Form.Item >
                <Button htmlType="submit" className="todoApp--header__add-task-btn">
                    <PlusCircleOutlined style={{ fontSize: "30px" }} />
                </Button>
            </Form.Item>
        </Form>

    </>)
}

export default FormInputTask