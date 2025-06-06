import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchCompanies, deleteCompany, exportCompaniesByName } from '../services/api';

const CompanyTable = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  const loadCompanies = async () => {
    const { data } = await fetchCompanies();
    setCompanies(data);
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);
    loadCompanies();
  };

  const handleExport = async () => {
    if (!selectedCompany) return;
    try {
      const res = await exportCompaniesByName(selectedCompany);
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${selectedCompany}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setSnackbar({ open: true, message: 'Xuất Excel thành công!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Không tìm thấy dữ liệu cho công ty đã chọn.', severity: 'error' });
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const companyNames = [...new Set(companies.map(c => c.companyName))];

  return (
    <>
      <FormControl sx={{ mt: 2, minWidth: 240 }} size="small">
        <InputLabel>Chọn công ty để xuất Excel</InputLabel>
        <Select
          value={selectedCompany}
          label="Chọn công ty để xuất Excel"
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          {companyNames.map((name, idx) => (
            <MenuItem key={idx} value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button sx={{ mt: 2, ml: 2 }} variant="contained" onClick={handleExport} disabled={!selectedCompany}>
        Xuất Excel công ty đã chọn
      </Button>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên Công Ty</TableCell>
              <TableCell>Ngày Khai HQ</TableCell>
              <TableCell>Phí Dỡ Hàng</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company._id} hover>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{new Date(company.date).toLocaleDateString()}</TableCell>
                <TableCell>{Number(company.unloadingFee).toLocaleString('vi-VN')}₫</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/company/${company._id}`)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(company._id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CompanyTable;
