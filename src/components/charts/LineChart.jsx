import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ labels, x1, x2, x1Label, x2Label, y1Format, y2Format, height, width }) {

    const options = {
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                ticks: {
                    format: y1Format || {
                        style: 'percent'
                    }
                },
                beginAtZero: x1.find(value => value < 0) !== -1
            }
        }
    }
    if(x2 !== undefined) {
        options.scales.y1 = {
            type: 'linear',
            position: 'right',
            grid: {
                drawOnChartArea: false
            },
            ticks: {
                format: y2Format || {}
            },
            beginAtZero: x1.find(value => value < 0) !== -1
        }
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: x1Label,
                data: x1,
                backgroundColor: '#fcaeae',
                borderColor: '#ff8282',
                yAxisID: 'y'
            }
        ]
    }
    if(x2 !== undefined) {
        data.datasets.push({
            label: x2Label,
            data: x2,
            borderColor: '#66bef9',
            backgroundColor: '#aaddff',
            yAxisID: 'y1'
        })
    }
    return (
        <div style={{ height, width }}>
            <Line
                height='100%'
                data={data}
                options={options}
            />
        </div>
    );
}

export default LineChart;