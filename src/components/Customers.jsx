import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useCallback, useRef } from "react";

import { Button } from "@mui/material";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import NewTraining from "./NewTraining";



function Customers() {

    const [customers, setCustomers] = useState([]);

    const [colDef] = useState([
        { field: 'firstname', filter: true },
        { field: 'lastname', filter: true },
        { field: 'streetaddress', filter: true },
        { field: 'postcode', filter: true },
        { field: 'city', filter: true },
        { field: 'email', filter: true },
        { field: 'phone', filter: true },
        {
            cellRenderer: params =>
            <NewTraining url={params.data._links.customer.href} saveTraining={saveTraining}/>
        },
        {
            cellRenderer: params =>
            <EditCustomer data={params.data} updateCustomer={updateCustomer}/>
        },
        {
            cellRenderer: params =>
            <Button color="error" onClick={() => deleteCustomer(params.data._links.customer.href)}>
                Delete
            </Button>
        },
        {
            processCellCallback: params => params.value && params.value.props && params.value.props.children ? params.value.props.children : params.value
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetch(import.meta.env.VITE_API_CUSTOMERS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json()
        })
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.error(err))
    };

    const addCustomer = (newCustomer) => {
        fetch(import.meta.env.VITE_API_CUSTOMERS_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json()
        })
        .then(() => handleFetch())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
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

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json()
        })
        .then(() => handleFetch())
        .catch(err => console.error(err))
        }
    
    const saveTraining = (newTraining) => {
        fetch(import.meta.env.VITE_API_TRAININGS_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json()
        })
        .then(() => handleFetch())
        .catch(err => console.error(err))
    }

    const onBtnExport = useCallback(() => {
        const excludedColumnKeys = ['newTraining', 'editCustomer', 'deleteButton'];

        const allColumnKeys = gridRef.current.api.getColumnDefs().map(colDef => colDef.field);

        const exportColumnKeys = allColumnKeys.filter(key => !excludedColumnKeys.includes(key));

        gridRef.current.api.exportDataAsCsv({ columnKeys: exportColumnKeys });
    }, []);

    const gridRef = useRef();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Customers</h1>
            <AddCustomer addCustomer={addCustomer}/>
            <Button onClick={onBtnExport}>Download CSV File</Button>
            <div className="ag-theme-material" style={{ height: 600, width: 2000}}>
                <AgGridReact 
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                    suppressExcelExport={true}
                />
            </div>
        </div>
    )
}

export default Customers;