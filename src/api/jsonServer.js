import axios from "axios"

const url = "https://seed-indigo-plantain.glitch.me"

const JsonApi = {

    getAllTasks: async (params={}) => {
        try {
            const rsp = await axios.get(`${url}/tasks`, {
                params: {
                    _sort: "-createAt",
                    _order: "asc",
                    ...params
                }
            })
            if (rsp && rsp.status >= 200 && rsp.status <= 299) {
                return  rsp?.data
            }

        } catch (error) {
            console.error(error)
        }
        return null
    },
    deleteTask: async (id) => {
        try {
            await axios.delete(`${url}/tasks/${id}`)
        } catch (error) {
            console.error(error)
        }
    },
    addTask: async (params) => {
        try {
            await axios.post(`${url}/tasks`, params)
        } catch (error) {
            console.error(error)
        }
    },
    updateTask: async (id, params) => {
        try {
            await axios.patch(`${url}/tasks/${id}`, params)
        } catch (error) {
            console.error(error)
        }
    }

}

export default JsonApi
