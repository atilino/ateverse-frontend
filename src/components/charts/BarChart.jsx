import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ labels, datasets, options, height, width }) {

    const data = {
        labels: labels,
        datasets: datasets
    }

    return (
        <div style={{ height, width, position: 'relative' }}>
            <Bar
                data={data}
                options={{
                    scales: {
                        y: {
                            type: 'linear',
                            position: 'left',
                            beginAtZero: true,
                        }
                    },
                    ...options
                }
            }
            />
        </div>
    );
}

export default BarChart;