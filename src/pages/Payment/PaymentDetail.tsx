import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Tabs,
    Tab,
    Divider,
    InputLabel,
    MenuItem, FormControl, Select
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent.tsx";
import SuccessDialog from "../../components/SuccessDialog/SuccessDialog.tsx";
import {additionalMockData} from "../../assets/mockData/additionalData.ts";

interface PaymentDetailProps {
    payment_id: string;
    buid: string;
    trandate: string;
    trannbr: string;
    trantipe: string;
    dom_int: string;
    status: string;
    customer_id: string;
    transcount: string;
    chw: string;
    cargo_charge: string;
    payment_charge: string;
    amount: string;
    tax: string;
    amount_withtax: string;
    create_by: string;
    modified_by: string;
}

const PaymentDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Initial data dari location.state
    const [paymentData, setPaymentData] = useState<PaymentDetailProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const [additionalData, setAdditionalData] = useState(additionalMockData.rows[0] || null) as any;

    const handleSelectAdditionalData = (id: string) => {
        const selectedData = additionalMockData.rows.find(data => data.id === id);
        setAdditionalData(selectedData || null);
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        const stateData = location.state as PaymentDetailProps;
        if (stateData) {
            setPaymentData(stateData);
        } else {
            console.error("Data tidak ditemukan di location.state");
            navigate('/payment');
        }
        return () => clearTimeout(timer);
    }, [location.state, navigate]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSave = () => {
        console.log('Data saved:', paymentData);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate('/payment-data');
    };

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Payment Detail
            </Typography>

            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Payment Detail Tabs"
                sx={{
                    mb: 2,
                    '& .MuiTabs-flexContainer': {
                        borderBottom: '2px solid #e0e0e0',
                    },
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#666',
                        minWidth: '120px',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                            color: '#007aff',
                        },
                    },
                    '& .Mui-selected': {
                        color: '#007aff',
                        fontWeight: 'bold',
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#007aff',
                        height: '3px',
                        borderRadius: '3px 3px 0 0',
                    },
                }}
            >
                <Tab label="Main" />
                <Tab label="Additional" />
                <Tab label="Info" />
            </Tabs>

            {tabValue === 0 && (
                <Paper sx={{ p: 3, mt: 2, borderRadius: 2, boxShadow: 3, overflow: 'auto' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Payment
                    </Typography>

                    {/* Informasi Header */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Branch"
                                value={paymentData?.buid || ''}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Shift</InputLabel>
                                <Select defaultValue="1" label="Shift">
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Tran. Type</InputLabel>
                                <Select defaultValue="Not Set" label="Tran. Type">
                                    <MenuItem value="Not Set">-- Not Set --</MenuItem>
                                    <MenuItem value="Incoming">Incoming</MenuItem>
                                    <MenuItem value="Outgoing">Outgoing</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Area</InputLabel>
                                <Select defaultValue="Not Set" label="Area">
                                    <MenuItem value="Not Set">-- Not Set --</MenuItem>
                                    <MenuItem value="Domestic">Domestic</MenuItem>
                                    <MenuItem value="International">International</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Transaction Date"
                                value={paymentData?.trandate || ''}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Customer"
                                value={`Customer: ${paymentData?.customer_id || '0'}`}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Total AWB"
                                value="0"
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Total CHW"
                                value={paymentData?.chw || '0'}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* Charges Section */}
                    <Typography variant="h6" color="primary" gutterBottom>
                        Charges
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Cargo Charge"
                                value={paymentData?.cargo_charge || '0'}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Payment Charge"
                                value={paymentData?.payment_charge || '0'}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Total Timbun"
                                value="0"
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="BUBU Amount"
                                value="0"
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Amount With Tax"
                                value={paymentData?.amount_withtax || '0'}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Operator Amount"
                                value="0"
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* Detail dan Charges Tabel */}
                    <Grid container spacing={3}>
                        {/* Detail Table */}
                        <Grid item xs={12} sm={8}>
                            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                                <Typography variant="h6" sx={{ color: '#007aff' }}>Detail</Typography>
                                <Box sx={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                        <thead>
                                        <tr>
                                            <th>AWB</th>
                                            <th>Transaction No.</th>
                                            <th>Date</th>
                                            <th>CHW</th>
                                            <th>P1</th>
                                            <th>P2</th>
                                            <th>P3</th>
                                            <th>P4</th>
                                            <th>Biaya Timbun</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colSpan={9} style={{ textAlign: 'center' }}>No data found</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Charges Table */}
                        <Grid item xs={12} sm={4}>
                            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                                <Typography variant="h6" sx={{ color: '#007aff' }}>Charges</Typography>
                                <Box sx={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                        <thead>
                                        <tr>
                                            <th>Charge Name</th>
                                            <th>Val</th>
                                            <th>Vat</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center' }}>No data found</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        <Button variant="contained" color="success" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="contained" color="primary">
                            Open
                        </Button>
                        <Button variant="contained" color="warning">
                            Close
                        </Button>
                        <Button variant="contained" color="error">
                            Cancel
                        </Button>
                    </Box>
                </Paper>
            )}

            {tabValue === 1 && (
                <Box sx={{ mt: 2 }}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                            Payment
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="ID"
                                    value={additionalData?.id || 'N/A'}
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Date"
                                    value={additionalData?.date || 'N/A'}
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Description"
                                    value={additionalData?.description || ''}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select value={additionalData?.status || 'Open'} label="Status">
                                        <MenuItem value="Open">Open</MenuItem>
                                        <MenuItem value="Closed">Closed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                            *Double click row to see detail
                        </Typography>
                        <Divider sx={{ my: 3 }} />

                        {/* Additional Receipt Table */}
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Additional Receipt
                        </Typography>
                        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                <tr>
                                    <th style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>Id</th>
                                    <th style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>Date</th>
                                    <th style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>Description</th>
                                    <th style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>Status</th>
                                    <th style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>Subtotal</th>
                                    <th style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>Print</th>
                                </tr>
                                </thead>
                                <tbody>
                                {additionalMockData.rows.length > 0 ? (
                                    additionalMockData.rows.map((receipt, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => handleSelectAdditionalData(receipt.id)}
                                            style={{ cursor: 'pointer', backgroundColor: additionalData?.id === receipt.id ? '#f0f8ff' : 'transparent' }}
                                        >
                                            <td style={{ padding: '8px' }}>{receipt.id}</td>
                                            <td style={{ padding: '8px' }}>{receipt.date}</td>
                                            <td style={{ padding: '8px' }}>{receipt.description}</td>
                                            <td style={{ padding: '8px' }}>{receipt.status}</td>
                                            <td style={{ padding: '8px' }}>{receipt.subtotal}</td>
                                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                                <Button variant="contained" color="primary" size="small">
                                                    Print
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', padding: '16px' }}>
                                            showing total of 0 data
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </Paper>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
                            <Button variant="contained" color="success">
                                Save
                            </Button>
                            <Button variant="contained" color="primary">
                                New
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            )}

            {tabValue === 2 && (
                <Box sx={{ mt: 2 }}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, maxWidth: 600 }}>
                        <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                            Info
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body1" color="textSecondary">
                                    Payment Id
                                </Typography>
                                <Typography variant="body1">
                                    {paymentData?.payment_id || '0'}
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body1" color="textSecondary">
                                    Create By
                                </Typography>
                                <Typography variant="body1">
                                    {paymentData?.create_by ? `${paymentData.create_by}` : '/'}
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body1" color="textSecondary">
                                    Modified By
                                </Typography>
                                <Typography variant="body1">
                                    {paymentData?.modified_by ? `${paymentData.modified_by}` : '/'}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            )}

            <SuccessDialog open={openDialog} onClose={handleCloseDialog} />
        </Box>
    );
};

export default PaymentDetail;
