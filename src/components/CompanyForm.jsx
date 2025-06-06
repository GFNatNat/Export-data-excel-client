// CompanyForm.jsx (đã cập nhật từ phiên bản định dạng động + checkbox dỡ hàng)
import React from 'react';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const labelMap = {
  companyName: 'Tên công ty',
  declarationNumber: 'Số tờ khai',
  packageCount: 'Số kiện',
  weightKg: 'Số kg',
  transport: 'Phương tiện vận chuyển',
  containerType: 'Loại container',
  containerQuantity: 'Số lượng container',
  portAuthorityFee: 'Phí cảng vụ',
  seaportFee: 'Phí cảng biển',
  emptyPortFee: 'Phí cảng rỗng',
  transportFee: 'Phí vận chuyển',
  warehouseFee: 'Phí vận chuyển về kho',
  directDeliveryFee: 'Phí vận chuyển giao thẳng',
  hiepPhuocPortFee: 'Phí cảng Hiệp Phước',
  deliveryServiceFee: 'Dịch vụ giao nhận',
  customsFee: 'Lệ phí HQ',
  liftingFee: 'Hạ trái tuyến',
  serviceTotal10: 'T.C phí dịch vụ 10%',
  serviceTotal8: 'T.C phí dịch vụ 8%',
  totalAmount: 'Thành tiền',
  unloadingFee: 'Phí dỡ hàng (tự động)',
  note: 'Ghi chú',
  contractCode: 'Mã hợp đồng'
};

const CompanyForm = ({ formData, handleChange }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Ngày khai HQ"
          value={formData.date ? dayjs(formData.date) : null}
          onChange={(newValue) => handleChange({ target: { name: 'date', value: newValue.toISOString() } })}
          slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
        />
      </LocalizationProvider>

      <TextField
        select
        fullWidth
        margin="normal"
        label="Loại container"
        name="containerType"
        value={formData.containerType || ''}
        onChange={handleChange}
        SelectProps={{ native: true }}
      >
        <option value="">-- Chọn loại container --</option>
        <option value="20ft">Container 20 feet</option>
        <option value="40ft">Container 40 feet</option>
        <option value="le">Container số lẻ</option>
      </TextField>

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.hasUnloading}
            onChange={handleChange}
            name="hasUnloading"
            color="primary"
          />
        }
        label="Có dỡ hàng (500.000đ)"
      />

      {Object.keys(formData)
        .filter(
          (key) =>
            key !== 'date' &&
            key !== 'containerType' &&
            key !== 'hasUnloading' // exclude pseudo-field
        )
        .map((key) => (
          <TextField
            key={key}
            fullWidth
            name={key}
            label={labelMap[key] || key}
            value={formData[key] || ''}
            onChange={handleChange}
            margin="normal"
            InputProps={['totalAmount', 'serviceTotal10', 'serviceTotal8', 'unloadingFee'].includes(key) ? { readOnly: true } : undefined}
          />
        ))}
    </>
  );
};

export default CompanyForm;
