import { Calendar, dayjsLocalizer } from 'react-big-calendar'

import dayjs from 'dayjs'
import { useState, useEffect, useCallback  } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css'

function Calender () {

    const localizer = dayjsLocalizer(dayjs)

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetch(import.meta.env.VITE_API_TRAININGSWITHCUSTOMER_URL)
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json()
        })
        .then(data => {
            const formattedTrainings = data.map(training => ({
                id: training.id,
                title: training.activity + "/ " + training.customer.firstname + " " + training.customer.lastname,
                customer: training.customer.firstname + " " + training.customer.lastname,
                start: new Date(training.date),
                end: new Date(new Date(training.date).getTime() + training.duration * 60000) // Adding duration to start time to get end time
            }))
            setTrainings(formattedTrainings)
        })
        .catch(err => console.error(err))
    }

    const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
      )

    return (
        <>
            <h1>Calender</h1>
            <div>
                <Calendar
                    localizer={localizer}
                    events={trainings}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 1000, width: 1500 }}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
        </>
    );
}

export default Calender;