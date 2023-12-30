import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useState, useEffect } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import get_user from '../../../api/admin/get_user';
import swal from 'sweetalert';
import delete_user from '../../../api/admin/delete_user';

const User = () => {
    const [data, setData]= useState([])
    const [change, setChange]= useState(false)
    useEffect(()=> {
        (async ()=> {
            const result= await get_user()
            return setData(result)
        })()
    }, [])
    const columns = [
        // { field: "book_id", headerName: "ID", width: 90 },
        {
          field: "username",
          headerName: "Tên người dùng",
          width: 160,
        },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phoneNumber", headerName: "Số điện thoại", width: 120 },
        { field: "address", headerName: "Địa chỉ", width: 120,
        },
            {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                
                {/* <Book setChange={setChange} props={params.row} bookId={params.row.book_id} fetchData={fetchData} /> */}
                <MdDeleteOutline
                  className="bookListDelete"
                  onClick={() => {
                    swal("Thông báo", "Bạn có muốn xóa người dùng này không ?", {buttons: {
                        ok: "Xóa",
                        cancel: "Hủy"
                    }})
                    .then(async value=> {
                        if(value=== "ok") {
                            const result= await delete_user({idUser: params.row._id})
                            if(result?.delete=== true) {
                                swal("Thông báo", "Đã xóa người dùng thành công", "success")
                                .then(()=> setChange(!change))
                            }
                            else {
                                swal("Thông báo", "Lỗi không xác định", "error")
                            }
                        }
                        else {
                            return null
                        }
                    })
                  }}
                />
              </>
            );
          },
        },
      ];
    
  return (
    <div style={{height: 500}}>
        <DataGrid
          rows={data}
          columns={columns}
          disableSelectionOnClick
          pageSize={8}
          getRowId={(row) => row._id}
          getRowHeight={() => "auto"}
        />
    </div>
  )
}

export default User