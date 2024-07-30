
import { useEffect, useRef, useState } from 'react';
import './App.scss';
import GenID from './util/genId';
import JsonApi from './api/jsonServer';

import Task from './components/Task';
import FormInputTask from './components/FormInputTask';
import { Pagination, Spin, message } from 'antd';
import { Divider } from 'antd';
import { Row, Col, Layout } from 'antd';
import moment from 'moment';

function App() {

  const [listTask, setlistTask] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const updateListTask = async (currentPage = 1, perPage = 5) => {
    setIsLoading(true)
    let now = moment(moment(new Date()).format("DD/MM/YYYY"), "DD/MM/YYYY");
    // let rsp = await JsonApi.getAllTasks({ notifyAtTimestamp_gte: now.valueOf() })
    let rsp = await JsonApi.getAllTasks()
    setlistTask(rsp)
    setIsLoading(false)
  }


  useEffect(() => {
    updateListTask()
  }, [])


  const handleRemove = async (id) => {
    setIsLoading(true)
    await JsonApi.deleteTask(id)
    updateListTask()
  }

  const handleNotify = (listTask) => {
  }

  const handleAdd = async (task) => {
    setIsLoading(true)
    let newTask = {
      id: await GenID.genId(),
      name: task.taskName,
      notifyAt: task.notifyAt,
      isDone: false,
      notifyAtTimestamp: moment(task.notifyAt, "DD/MM/YYYY").valueOf(),
      createAt: Date.now()
    }
    await JsonApi.addTask(newTask)
    updateListTask()

  }


  const renderListTask = (lists) => {
    if (lists && !lists.length) {
      return (<>
        <div> Please insert new task</div>
      </>)
    }
    let now = moment(moment(new Date()).format("DD/MM/YYYY"), "DD/MM/YYYY");

    let isNotify = false
    let returnList = lists.map((item) => {
      isNotify = item.notifyAtTimestamp === now.valueOf()
      if (isNotify)
        message.info(item.name)
      return (
        <>
          <Task
            key={item.id}
            data={item}
            handleRemove={handleRemove}
            isNotify={isNotify}
          ></Task>
        </>
      )
    })

    return returnList
  }
  return (
    <div className="App">
      <div className="todoApp--container">
        <div className="todoApp--wrapper">
          <div className="todoApp--header">
            <div className="todoApp--header__title">
              <h1>Nhắc nhở ngày quan trọng</h1>
            </div>

          </div>
          <Divider />
          <div className="todoApp--main">
            <Layout>
              <Layout.Content style={{ padding: '20px 50px' }}>
                <Row gutter={[50, 50]}>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <FormInputTask handleAdd={handleAdd}></FormInputTask>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <div className="listTask">
                      {isLoading ? <Spin></Spin> : renderListTask(listTask)}
                    </div>
                  </Col>
                </Row>
              </Layout.Content>
            </Layout>
          </div>

        </div>


      </div>

    </div>
  );
}

export default App;
