import React from 'react';
import { Chart } from 'react-google-charts';

const LineChart = ({ years} ) => {
    console.log(years);
    const data = [
        ['Year', 'Sales'],
        [years.yearOne.year.toString(), years.yearOne.price],
        [years.yearTwo.year.toString(), years.yearTwo.price],
        [years.yearThree.year.toString(), years.yearThree.price],
        [years.yearFour.year.toString() , years.yearFour.price],
    ];

    const options = {
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    return (
        <Chart
            chartType="LineChart"
            width="900px"
            height="500px"
            data={data}
            options={options}
        />
    );
};

export default LineChart;