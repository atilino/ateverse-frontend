import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function BarChart({ labels, datasets, options, height, width }) {

    const data = {
        labels: labels,
        datasets: datasets
    }

    return (
        <div style={{ height, width, position: 'relative' }}>
            <Doughnut data={data}options={options}/>
        </div>
    );
}

export default BarChart;