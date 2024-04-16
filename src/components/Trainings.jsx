import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { Button } from "@mui/material";

function Trainings() {

    const [Trainings, setTrainings] = useState([]);

    const [colDef] = useState([
        { field: 'activity', filter: true },
        { field: 'customer', filter: true },
        { field: 'duration', filter: true },
        { field: 'date', filter: true },
        {
            cellRenderer: params =>
            <Button color="error" onClick={() => deleteTraining(params.data._links.training.href)}>
                Delete
            </Button>
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetch(import.meta.env.VITE_API_TRAININGS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json()
        })
        .then(data => {
            const changeTime = data._embedded.trainings.map(training => {
                training.date = dayjs(training.date).format('DD.MM.YYYY HH:mm');
                return training;
            })
            return changeTime;
        })
        .then(dataWithTime => {
            const trainingPromises = dataWithTime.map(training => {
                return fetch(training._links.customer.href)
                    .then(response => {
                        if (!response.ok)
                            throw new Error(response.statusText);
                        return response.json();
                    })
                    .then(customerData => {
                        training.customer = customerData.firstname + " " + customerData.lastname;
                        return training;
                    });
            });
            return Promise.all(trainingPromises);
        })
        .then(trainingsWithCustomer => setTrainings(trainingsWithCustomer))
        .catch(err => console.error(err))
    };

    const deleteTraining = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { 
                method: 'DELETE' 
            })
            .then(response => {
                if (!response.ok)
                    throw new Error(response.statusText)
                return response.json()
            })
            .then(() => handleFetch())
            .catch(err => console.error(err))
        }
    }

    return (
        <>
            <h1>Trainings</h1>

            <div className="ag-theme-material" style={{ height: 600, width: 1000}}>
                <AgGridReact 
                    rowData={Trainings}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    )
}

export default Trainings;