import axios from 'axios'

// add api key to each request
axios.interceptors.request.use(config => {
  if (!config.params) config.params = {}
  config.params['api_key'] = process.env.VUE_APP_MDB_API_KEY
  return config
})

export default axios
