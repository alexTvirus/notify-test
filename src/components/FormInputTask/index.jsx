import { useState } from "react"
import { Button, Form, Input } from 'antd';
import "./style.scss"
import { Row, Col, Layout } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';


const FormInputTask = (props) => {
    const [form] = Form.useForm();
    const { handleAdd } = props

    const handleOnchageInput = (e) => {
        
    }

    const prehandleSubmit = (e) => {
        handleAdd({
            taskName: e.taskName,
            notifyAt: moment(e.notifyAt.$d).format("DD/MM/YYYY"),
        })
        form.resetFields()
    }

    const validateNotifyDate = (rule, value) => {
        if (value) {
            let notify = moment(moment(value.$d).format("DD/MM/YYYY"), "DD/MM/YYYY")
            let now = new Date();
            now = moment(moment(now).format("DD/MM/YYYY"), "DD/MM/YYYY");
            if (notify.isBefore(now)) {
                return Promise.reject('notify date must be greater now');
            }
        }
        return Promise.resolve();
    }

    return (<>

        <Form form={form} className="todoApp--main__form" onFinish={prehandleSubmit} layout="vertical">
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item
                        className="todoApp--main__task-name-input"
                        name="taskName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Task Name!',
                            },
                        ]}
                    >
                        <Input placeholder="Task Name" 
                            onChange={handleOnchageInput}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[30]}>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Form.Item
                        name="notifyAt"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your notify date!',
                            },
                            { validator: validateNotifyDate }
                        ]}
                    >
                        <DatePicker className="todoApp--main__date-picker-input" needConfirm />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" className="todoApp--header__add-task-btn">
                            Lưu ngày
                        </Button>
                    </Form.Item>
                </Col>
            </Row>


        </Form>

    </>)
}

export default FormInputTask