
import { useEffect, useRef, useState } from 'react';
import './App.scss';
import GenID from './util/genId';
import JsonApi from './api/jsonServer';

import Task from './components/Task';
import FormInputTask from './components/FormInputTask';
import { Pagination, Spin } from 'antd';
import { Divider } from 'antd';
function App() {

  const [listTask, setlistTask] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 5,
    totalData: 0
  })

  const updateListTask = async (currentPage = 1, perPage) => {
    setIsLoading(true)
    let rsp = await JsonApi.getAllTasks({ _page: currentPage, _per_page: perPage })
    setPagination({
      currentPage: currentPage,
      perPage: perPage,
      totalData: rsp.items
    })
    setlistTask(rsp.data)
    setIsLoading(false)
  }

  const handlePagination = async (page, pageSize) => {
    updateListTask(page, pageSize)
  }

  useEffect(() => {
    updateListTask(pagination.currentPage, pagination.perPage)
  }, [])


  const handleRemove = async (id) => {
    setIsLoading(true)
    await JsonApi.deleteTask(id)
    updateListTask(pagination.currentPage, pagination.perPage)
  }

  const handleDone = async (id) => {
    setIsLoading(true)
    let newTask = {
      id: id,
      isDone: true
    }
    await JsonApi.updateTask(id, newTask)
    updateListTask(pagination.currentPage, pagination.perPage)
  }

  const handleAdd = async (task) => {
    setIsLoading(true)
    let newTask = {
      id: await GenID.genId(),
      name: task,
      isDone: false,
      createAt: Date.now()
    }
    await JsonApi.addTask(newTask)
    updateListTask(pagination.currentPage, pagination.perPage)

  }


  const renderListTask = (lists) => {
    if (lists && !lists.length) {
      return (<>
        <div> Please insert new task</div>
      </>)
    }

    return lists.map((item) => {
      return (
        <>
          <Task
            key={item.id}
            data={item}
            handleDone={handleDone}
            handleRemove={handleRemove}

          ></Task>
        </>
      )
    })
  }
  return (
    <div className="App">
      <div className="todoApp--container">
        <div className="todoApp--wrapper">
          <div className="todoApp--header">
            <div className="todoApp--header__title">
              <h1>To Do List App</h1>
            </div>
            <FormInputTask handleAdd={handleAdd}></FormInputTask>
          </div>
          <Divider />
          <div className="todoApp--main">
            {isLoading ? <Spin></Spin> : renderListTask(listTask)}
          </div>
          <Divider />
          <div className="todoApp--footer">
            <Pagination align="center"
              onChange={handlePagination}
              pageSize={pagination.perPage}
              defaultCurrent={pagination.currentPage}
              current={pagination.currentPage}
              total={pagination.totalData || 0} />
          </div>
        </div>


      </div>

    </div>
  );
}

export default App;
