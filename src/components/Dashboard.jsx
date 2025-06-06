import React from 'react';
import { Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';

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
  unloadingFee: 'Phí dỡ hàng',
  serviceTotal10: 'T.C phí dịch vụ 10%',
  serviceTotal8: 'T.C phí dịch vụ 8%',
  totalAmount: 'Thành tiền',
  note: 'Ghi chú',
  contractCode: 'Mã hợp đồng',
  date: 'Ngày khai HQ'
};

const Dashboard = ({ data, editable, handleChange }) => {
  return (
    <Table component={Paper}>
      <TableBody>
        {Object.entries(data).map(([key, value]) => (
          !['_id', '__v', 'botFee', 'hasUnloading'].includes(key) && (
            <TableRow key={key}>
              <TableCell>{labelMap[key] || key}</TableCell>
              <TableCell>
                {editable ? (
                  <input
                    style={{ width: '100%' }}
                    name={key}
                    value={value || ''}
                    onChange={handleChange}
                  />
                ) : (
                  String(value)
                )}
              </TableCell>
            </TableRow>
          )
        ))}
      </TableBody>
    </Table>
  );
};

export default Dashboard;
