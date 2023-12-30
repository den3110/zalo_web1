import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import stats_a from '../../../api/admin/stats'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const Stats = () => {
  const [data, setData]= useState([])
  useEffect(()=> {
    (async ()=> {
        const result= await stats_a()
        return setData(result)
    })()

  }, [])
  
  return (
    <div>
        <div style={{fontWeight: 600, fontSize: 18, marginBottom: 20}}>Số lượng tin nhắn trong 7 ngày qua</div>
        {/* <Bar data={chartData} options={chartOptions} /> */}
        <BarChart
            width={1000}
            height={300}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stats" fill="#8884d8" />
        </BarChart>
    </div>
  )
}

export default Stats