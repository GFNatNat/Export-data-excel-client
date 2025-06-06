// CreateCompanyPage.jsx (có thêm unloadingFee, đồng bộ với hasUnloading checkbox)
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CompanyForm from '../components/CompanyForm';
import { createCompany } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const CreateCompanyPage = () => {
  const [formData, setFormData] = useState({
    date: '',
    companyName: '',
    declarationNumber: '',
    packageCount: '',
    weightKg: '',
    transport: '',
    containerType: '',
    containerQuantity: '',
    portAuthorityFee: '',
    seaportFee: '',
    emptyPortFee: '',
    transportFee: '',
    warehouseFee: '',
    directDeliveryFee: '',
    hiepPhuocPortFee: '',
    deliveryServiceFee: '',
    customsFee: '',
    liftingFee: '',
    unloadingFee: '',
    serviceTotal10: '',
    serviceTotal8: '',
    totalAmount: '',
    note: '',
    contractCode: '',
    hasUnloading: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'hasUnloading') {
      setFormData((prev) => ({
        ...prev,
        hasUnloading: checked,
        unloadingFee: checked ? '500000' : '0'
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const { containerType, containerQuantity } = formData;
    const qty = parseInt(containerQuantity, 10) || 0;
    let fee = 0;

    if (containerType === '20ft') fee = 2700000 * qty;
    else if (containerType === '40ft') fee = 3400000 * qty;
    else if (containerType === 'le') fee = 700000 * qty;

    setFormData((prev) => ({ ...prev, transportFee: fee.toString() }));
  }, [formData.containerType, formData.containerQuantity]);

  useEffect(() => {
    const qty = parseInt(formData.containerQuantity, 10) || 0;
    const delivery = parseInt(formData.deliveryServiceFee, 10) || 0;
    const customs = parseInt(formData.customsFee, 10) || 0;
    const lifting = parseInt(formData.liftingFee, 10) || 0;
    const transport = parseInt(formData.transportFee, 10) || 0;
    const hiepPhuoc = parseInt(formData.hiepPhuocPortFee, 10) || 0;
    const bot = 160000 * qty;

    const total10 = delivery + customs + lifting + transport + hiepPhuoc + bot;
    const total8 = (total10 / 1.1) * 1.08;

    setFormData((prev) => ({
      ...prev,
      serviceTotal10: Math.round(total10).toString(),
      serviceTotal8: Math.round(total8).toString()
    }));
  }, [
    formData.containerQuantity,
    formData.deliveryServiceFee,
    formData.customsFee,
    formData.liftingFee,
    formData.transportFee,
    formData.hiepPhuocPortFee
  ]);

  useEffect(() => {
    const others = [
      'portAuthorityFee',
      'seaportFee',
      'emptyPortFee',
      'warehouseFee',
      'directDeliveryFee',
      'serviceFee',
      'unloadingFee'
    ];
    const base = others.reduce((sum, field) => {
      const val = parseInt(formData[field], 10);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

    const service8 = parseInt(formData.serviceTotal8, 10) || 0;
    const total = base + service8;

    setFormData((prev) => ({ ...prev, totalAmount: total.toString() }));
  }, [
    formData.portAuthorityFee,
    formData.seaportFee,
    formData.emptyPortFee,
    formData.warehouseFee,
    formData.directDeliveryFee,
    formData.serviceFee,
    formData.unloadingFee,
    formData.serviceTotal8
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCompany(formData);
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Tạo Công Ty Mới</Typography>
        <form onSubmit={handleSubmit}>
          <CompanyForm
            formData={formData}
            handleChange={handleChange}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Lưu
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default CreateCompanyPage;
