import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'


const BarChart1 = () => {
    const series = [{
        name: '2021',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
        name: '2022',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    ]
    const options = {
        chart: {
            type: 'bar',
            height: 300
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
            title: {
                text: 'Sales Quantity -Kgs'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    }

    return (
        <div>
            <ReactApexChart options={options} series={series} type="bar" height={300} />
        </div>
    );
}
export default BarChart1;
