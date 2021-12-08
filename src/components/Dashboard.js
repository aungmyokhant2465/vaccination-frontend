import React, { useState, useEffect } from "react";
import { CartesianGrid, XAxis, YAxis, AreaChart, Area, Tooltip } from 'recharts';
import vaccinatedUserService from "../services/vaccinatedUser";

const Dashboard = () => {
  
  const [counts, setCounts] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    vaccinatedUserService.countUsers()
      .then(result => {
        setCounts(result)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    vaccinatedUserService.vaccinated()
      .then(result => {
        parseData(result)
      })
  }, [])

  const parseData = (first) => {
    let date = ''
    let dateObject
    let aDate
    let bDate
    let temp_data = []
    let all_date = []
    first.sort((a, b) => {
      aDate = new Date(a.vaccineFirstDate)
      bDate = new Date(b.vaccineFirstDate)
      if(aDate.getFullYear() < bDate.getFullYear() ) {
        return -1
      } else if(aDate.getFullYear() === bDate.getFullYear()) {
        if(aDate.getMonth() < bDate.getMonth() ) {
          return -1
        } else if(aDate.getMonth() === bDate.getMonth()) {
          if(aDate.getDate() < bDate.getDate()) {
            return -1
          }
        }
      }
      return 1
    })
    first.forEach(f => {
      dateObject = new Date(f.vaccineFirstDate)
      date = dateObject.getDate() + '-' + (dateObject.getMonth() + 1) + '-' + dateObject.getFullYear()
      all_date.push(date)
    })
    for (let outer = 0; outer < all_date.length; outer++) {
      if(temp_data.length === 0) {
        temp_data[0] = { date: all_date[outer], count: 1 }
        continue
      }
      let flat = false
      for (let inner = 0; inner < temp_data.length; inner++) {
        if(temp_data[inner].date === all_date[outer]) {
          temp_data[inner] = { ...temp_data[inner], count: ++temp_data[inner].count }
          flat = true
          break
        }
      }
      if(!flat) {
        temp_data.push({ date: all_date[outer], count: 1 })
      }
    }
    setData(temp_data)
  }

  if(!counts) {
    return (
      <div>Loading...</div>
    )
  }
  
  return (
      <div className="container dashboard">
        <div className="shotcut-container">
          <div className="shotcut">
            <p>{counts.calcuatedScannedCount}</p>
            <p>Total QR Scan Count</p>
          </div>
          <div className="shotcut">
            <p>{counts.totalVaccinated}</p>
            <p>Total Vaccinated</p>
          </div>
          <div className="shotcut">
            <p>{counts.fristVaccinatedCount}</p>
            <p>Total Vaccination Step 1</p>
          </div>
          <div className="shotcut">
            <p>{counts.secondVaccinatedCount}</p>
            <p>Total Vaccination Complate</p>
          </div>
        </div>
        <div className="chart-container">
          {
            data && <AreaChart width={1000} height={400} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFBF84" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FFBF84" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#FFBF84" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
          }
        </div>
      </div>
  )
}

export default Dashboard