import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCompany, updateCompany, exportCompany } from '../services/api';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import { Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});

  const loadCompany = async () => {
    const { data } = await fetchCompany(id);
    setCompany(data);
    setFormData(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setFormData({
      ...formData,
      unloadingFee: checked ? '500000' : '0',
    });
  };

  const handleSave = async () => {
    await updateCompany(id, formData);
    setEditable(false);
    loadCompany();
  };

  const handleExportExcel = async () => {
    const res = await exportCompany(id);
    const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${formData.companyName || 'company'}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    loadCompany();
  }, [id]);

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Dashboard - {company.companyName}</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="outlined" onClick={() => setEditable(!editable)}>
            {editable ? 'Hủy' : 'Chỉnh sửa'}
          </Button>
        </Box>

        {editable && (
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.unloadingFee === '500000'}
                onChange={handleCheckboxChange}
              />
            }
            label="Có phí dỡ hàng (500,000 VND)"
            sx={{ mb: 2 }}
          />
        )}

        <Dashboard data={formData} editable={editable} handleChange={handleChange} />

        {editable && (
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
            Lưu thay đổi
          </Button>
        )}
      </Box>
    </div>
  );
};

export default CompanyPage;
