import { useEffect, useState} from "react";

import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';


function Charts () {

    const [trainings, setTrainings] = useState([]);
    const [trainingWithDuration, setTrainingWithDuration] = useState([{
        activity: '',
        duration: ''
    }]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleSorting = (data) => {
        const combined = data.reduce((acc, curr) => {
            if (acc[curr.activity]) {
              acc[curr.activity] += curr.duration;
            } else {
              acc[curr.activity] = curr.duration;
            }
            return acc;
          }, {});
          setTrainingWithDuration(combined)
    } 

    console.log('trainingWithDuration:', trainingWithDuration);

    const handleFetch = () => {
        fetch(import.meta.env.VITE_API_TRAININGS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json()
        })
        .then(data => {
            const activitiesAndDurations = data._embedded.trainings.map(training => ({
                activity: training.activity,
                duration: training.duration
            }))
            setTrainings(activitiesAndDurations)
            handleSorting(activitiesAndDurations)
        })
        .catch(err => console.error(err))
    }

    const activitiesAndDurations = Object.entries(trainingWithDuration).map(([activity, duration]) => ({
        activity,
        duration
      }));

    return (
        <>
            <h1>Charts</h1>

            <BarChart
                xAxis={[
                { scaleType: 'band', data: activitiesAndDurations.map(training => training.activity) }
                ]}
                series={[
                { data: activitiesAndDurations.map(training => training.duration), label: 'Duration' }
                ]}
                width={500}
                height={300}
            />
        </>
    );
}

export default Charts;