// import React, { useContext } from 'react';
// import swal from 'sweetalert';
// import Button from '@mui/material/Button';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import LinearProgress from '@mui/material/LinearProgress';
// import DialogContentText from '@mui/material/DialogContentText';
// import PropTypes from 'prop-types';
// import useHttp from '../../../hooks/use-http';
// import { UserContext } from '../../../store/admin/user-context';
// import { editUser } from '../../../lib/api/user';

// const ActiveUserForm = () => {
//   const { sendRequest, status, data, error } = useHttp(editUser);
//   const userCtx = useContext(UserContext);
//   const { handleCloseActive, handleEditUser, activeUserObj } = userCtx;
//   const { actived } = activeUserObj;
//   React.useEffect(() => {
//     if (status === 'completed') {
//       if (data) {
//         handleCloseActive();
//         swal(
//           `${actived ? 'Vô hiệu' : 'Kích hoạt'} thành công!`,
//           `Bạn đã ${actived ? 'vô hiệu' : 'kích hoạt'} người dùng thành công`,
//           'success'
//         );
//         handleEditUser(data);
//       } else if (error) swal('Đã có lỗi xảy ra', error, 'error');
//     }
//   }, [data, error, status, handleCloseActive, handleEditUser, activeUserObj]);
//   const activeUsersSubmitHandler = (event) => {
//     event.preventDefault();
//     const request = {
//       id: activeUserObj.id,
//       actived: !actived,
//     };
//     sendRequest(request);
//   };
//   return (
//     <div>
//       <Dialog
//         open
//         onClose={handleCloseActive}
//         aria-labelledby='alert-dialog-title'
//         aria-describedby='alert-dialog-description'
//       >
//         <form onSubmit={activeUsersSubmitHandler}>
//           {status === 'pending' && <LinearProgress />}
//           <DialogTitle id='alert-dialog-title'>Cảnh báo</DialogTitle>
//           <DialogContent>
//             <DialogContentText id='alert-dialog-description'>
//               {!actived
//                 ? 'Bạn có muốn kích hoạt người dùng này không?'
//                 : 'Bạn có muốn vô hiệu hóa người dùng này không?'}
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               disabled={status === 'pending'}
//               variant='contained'
//               type='submit'
//               autoFocus
//             >
//               {status === 'pending'
//                 ? `Đang ${actived ? 'vô hiệu' : 'kích hoạt'}...`
//                 : 'Xác nhận'}
//             </Button>
//             <Button onClick={handleCloseActive}>Hủy</Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </div>
//   );
// };
// ActiveUserForm.propTypes = {
//   actived: PropTypes.bool,
// };
// export default ActiveUserForm;
