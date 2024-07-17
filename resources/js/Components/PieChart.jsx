// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => `${item.name} : ${formatNumber(item.total_suara)} (${item.percentage}%)`),
        datasets: [
            {
                data: data.map(item => item.total_suara),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }
        ]
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw;
                        const percentage = context.label.match(/\(([^)]+)\)/)[1]; // Extract percentage from label
                        return `${label}: ${formatNumber(value)} votes`;
                    }
                }
            }
        }
    };

    return <Pie data={chartData} options={options} />;
};

const formatNumber = (number) => {
    if (number === null || number === undefined) {
        return '0';
    }
    return number.toLocaleString('id-ID');
};

export default PieChart;
