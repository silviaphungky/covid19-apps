import axios from 'axios'

const CovidApi = {

  getCountries: async () => {

    const url ='https://covid-193.p.rapidapi.com/countries'
    const response = await axios.get(
      url,
      {  
        'headers': {
          'content-type'    : 'application/octet-stream',
          'x-rapidapi-host' : 'covid-193.p.rapidapi.com',
          'x-rapidapi-key'  : '1237d51320msh707680e90308e62p148ad6jsn5b1ba1898c77',
          'useQueryString'  : true
        }
      }
    )
    return response
  },

  getStatistic: async (value) => {
    const url = `https://covid-193.p.rapidapi.com/statistics?country=${value}`
    const response = await axios.get(
      url,
      {  
        'headers': {
          'content-type'    : 'application/octet-stream',
          'x-rapidapi-host' : 'covid-193.p.rapidapi.com',
          'x-rapidapi-key'  : '1237d51320msh707680e90308e62p148ad6jsn5b1ba1898c77',
          'useQueryString'  : true
        }
      }
    )
    return response
  },

  getHistory: async ({ country, date }) => {
    const url=`https://covid-193.p.rapidapi.com/history?country=${country}&day=${date}`
    const response = await axios.get(
      url,
      {  
        'headers': {
          'content-type'    : 'application/octet-stream',
          'x-rapidapi-host' : 'covid-193.p.rapidapi.com',
          'x-rapidapi-key'  : '1237d51320msh707680e90308e62p148ad6jsn5b1ba1898c77',
          'useQueryString'  : true
        }
      }
    )
    return response
  }
}

export  default CovidApi
