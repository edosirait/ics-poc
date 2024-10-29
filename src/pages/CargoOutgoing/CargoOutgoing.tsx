import React from 'react';
import { cargoOutgoingData } from '../../assets/mockData/cargoOutgoing';
import ReusableTable from "../../components/ReusableTable/ReusableTable.tsx";
import {Box, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const columns = [
    { id: 'cargo_id', label: 'Id', minWidth: 80 },
    { id: 'buid', label: 'Branch', minWidth: 100 },
    { id: 'trandate', label: 'Date In', minWidth: 150 },
    { id: 'trannbr', label: 'Number', minWidth: 100 },
    { id: 'flight', label: 'Flight', minWidth: 100 },
    { id: 'awb', label: 'AWB', minWidth: 100 },
    { id: 'ori', label: 'Origin', minWidth: 100 },
    { id: 'dst', label: 'Destination', minWidth: 100 },
    { id: 'qty', label: 'Qty', minWidth: 50, align: 'center' },
    { id: 'total_qty', label: 'Total Qty', minWidth: 80, align: 'center' },
    { id: 'chw', label: 'CHW', minWidth: 80 },
    { id: 'sender', label: 'Sender', minWidth: 150 },
    { id: 'receiver', label: 'Receiver', minWidth: 150 },
    { id: 'create_by', label: 'Create By', minWidth: 150 },
    { id: 'modified_by', label: 'Modified By', minWidth: 150 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        align: 'center',
        format: (value: string) => (
            <Chip
                label={value}
                color="success"
                sx={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}
            />
        ),
    },
] as any;

const CargoOutgoing: React.FC = () => {
    const navigate = useNavigate();

    const handleRowClick = (params: any) => {
        console.log('params', params)
        navigate(`/cargo-outgoing/edit/${params.cargo_id}`, {
            state: params,
        });
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Transaction Cargo Outgoing
            </Typography>
            <ReusableTable columns={columns} rows={cargoOutgoingData.rows} onRowClick={handleRowClick} />
        </Box>
    );
};

export default CargoOutgoing;
