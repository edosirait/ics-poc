import React, {useEffect, useState} from 'react';
import {Box, Typography, TextField, Button, Grid, Paper, Tabs, Tab, Divider} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent.tsx";
import SuccessDialog from "../../components/SuccessDialog/SuccessDialog.tsx";

interface CargoDetailProps {
    cargo_id: string;
    buid: string;
    trandate: string;
    trannbr: string;
    flight: string;
    awb: string;
    ori: string;
    dst: string;
    qty: string;
    total_qty: string;
    chw: string;
    sender: string;
    receiver: string;
    create_by: string;
    modified_by: string;
    status: string;
}

const CargoOutgoingDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Initial data dari location.state
    const [cargoData, setCargoData] = useState<CargoDetailProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const [documentForm, setDocumentForm] = useState({
        type: '',
        docDate: '',
        kodePengeluaran: '',
        number: '',
        relatedNumber: '',
        noSegelBC: '',
        tglSegelBC: ''
    });
    const [documentTable, setDocumentTable] = useState<any[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        const stateData = location.state as CargoDetailProps;
        if (stateData) {
            setCargoData(stateData);
        } else {
            console.error("Data tidak ditemukan di location.state");
            navigate('/cargo-outgoing');
        }
        return () => clearTimeout(timer);
    }, [location.state, navigate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCargoData((prevData) => prevData ? { ...prevData, [name]: value } : null);
    };

    const handleSave = () => {
        console.log('Data saved:', cargoData);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate('/cargo-outgoing');
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDocumentForm({ ...documentForm, [name]: value });
    };

    const handleSubmitDocument = () => {
        setDocumentTable([...documentTable, documentForm]);
        setDocumentForm({
            type: '',
            docDate: '',
            kodePengeluaran: '',
            number: '',
            relatedNumber: '',
            noSegelBC: '',
            tglSegelBC: ''
        });
    };

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography style={{ marginBottom: '2rem'}} variant="h5" fontWeight="bold" gutterBottom>
                Cargo Outgoing
            </Typography>

            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Cargo Outgoing Tabs"
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
                <Tab label="Document" />
                <Tab label="Info" />
            </Tabs>

            {tabValue === 0 && (
                <Paper sx={{ p: 3, mt: 2 }}>
                    <Grid container spacing={2}>
                        {/* Form fields for Main tab */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Cargo ID"
                                name="cargo_id"
                                value={cargoData?.cargo_id}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Branch"
                                name="buid"
                                value={cargoData?.buid}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date In"
                                name="trandate"
                                value={cargoData?.trandate}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Number"
                                name="trannbr"
                                value={cargoData?.trannbr}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Flight"
                                name="flight"
                                value={cargoData?.flight}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="AWB"
                                name="awb"
                                value={cargoData?.awb}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Origin"
                                name="ori"
                                value={cargoData?.ori}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Destination"
                                name="dst"
                                value={cargoData?.dst}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Quantity"
                                name="qty"
                                value={cargoData?.qty}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Total Quantity"
                                name="total_qty"
                                value={cargoData?.total_qty}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="CHW"
                                name="chw"
                                value={cargoData?.chw}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Sender"
                                name="sender"
                                value={cargoData?.sender}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Receiver"
                                name="receiver"
                                value={cargoData?.receiver}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Created By"
                                name="create_by"
                                value={cargoData?.create_by}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Modified By"
                                name="modified_by"
                                value={cargoData?.modified_by}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Status"
                                name="status"
                                value={cargoData?.status}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Box>
                </Paper>
            )}

            {tabValue === 1 && (
                <Box sx={{ mt: 2 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Document</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Type"
                                    name="type"
                                    value={documentForm.type}
                                    onChange={handleFormChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Doc Date (TGL DOK)"
                                    name="docDate"
                                    value={documentForm.docDate}
                                    onChange={handleFormChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Kode Pengeluaran (KD.DOK)"
                                    name="kodePengeluaran"
                                    value={documentForm.kodePengeluaran}
                                    onChange={handleFormChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Number (NO.DOK)"
                                    name="number"
                                    value={documentForm.number}
                                    onChange={handleFormChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Related Number (NO.POS)"
                                    name="relatedNumber"
                                    value={documentForm.relatedNumber}
                                    onChange={handleFormChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="No Segel BC"
                                    name="noSegelBC"
                                    value={documentForm.noSegelBC}
                                    onChange={handleFormChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Tgl Segel BC"
                                    name="tglSegelBC"
                                    value={documentForm.tglSegelBC}
                                    onChange={handleFormChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button variant="contained" color="success" onClick={handleSubmitDocument}>
                                Submit
                            </Button>
                            <Button variant="contained" color="primary">
                                New Doc
                            </Button>
                            <Button variant="contained" color="info">
                                Load Doc
                            </Button>
                        </Box>

                        <Box sx={{ mt: 6 }}>
                            <Typography sx={{ mb: 4 }} variant="h6" gutterBottom>Documents List</Typography>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                <tr>
                                    <th>Doc Date</th>
                                    <th>Type</th>
                                    <th>Kode Pengeluaran</th>
                                    <th>Number</th>
                                    <th>Related Number</th>
                                    <th>No Segel BC</th>
                                    <th>Tgl Segel BC</th>
                                </tr>
                                </thead>
                                <tbody>
                                {documentTable.length > 0 ? (
                                    documentTable.map((doc, index) => (
                                        <tr key={index}>
                                            <td>{doc.docDate}</td>
                                            <td>{doc.type}</td>
                                            <td>{doc.kodePengeluaran}</td>
                                            <td>{doc.number}</td>
                                            <td>{doc.relatedNumber}</td>
                                            <td>{doc.noSegelBC}</td>
                                            <td>{doc.tglSegelBC}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center' }}>No data found</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </Box>
                    </Paper>
                </Box>
            )}

            {tabValue === 2 && (
                <Box sx={{ mt: 2 }}>
                    <Paper sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            {/* Left Panel - Info */}
                            <Grid item xs={12} md={6}>
                                {/*<Paper elevation={3} sx={{ p: 3 }}>*/}
                                    <Typography variant="h6" gutterBottom color="primary">Info</Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <TextField
                                            label="Cargo ID"
                                            value={cargoData?.cargo_id || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Tran. Number"
                                            value={cargoData?.trannbr || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Branch ID"
                                            value={cargoData?.buid || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Origin"
                                            value={cargoData?.ori || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Tran. Type"
                                            value={cargoData?.trannbr || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Area"
                                            value={cargoData?.ori || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                            Created By: {cargoData?.create_by}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Modified By: {cargoData?.modified_by}
                                        </Typography>
                                    </Box>
                                {/*</Paper>*/}
                            </Grid>

                            {/* Right Panel - Date */}
                            <Grid item xs={12} md={6}>
                                {/*<Paper elevation={3} sx={{ p: 3 }}>*/}
                                    <Typography variant="h6" gutterBottom color="primary">Date</Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <TextField
                                            label="Transaction Date"
                                            value={cargoData?.trandate || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Status Release Date"
                                            value={cargoData?.status || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            label="BTB Date"
                                            value={cargoData?.trandate || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Depart Date"
                                            value={cargoData?.trandate || '-'}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Box>
                                {/*</Paper>*/}
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            )}

            <SuccessDialog open={openDialog} onClose={handleCloseDialog} />
        </Box>
    );
};

export default CargoOutgoingDetail;
