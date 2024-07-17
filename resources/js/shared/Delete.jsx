//import react  
import React from "react";

//import inertia adapter
import { Inertia } from '@inertiajs/inertia';
import { TbTrashXFilled } from "react-icons/tb";

//import Sweet Alert
import Swal from 'sweetalert2';

export default function Delete({ URL, id }) {

	//method destroy
    const destroy = async (id) => {

        //show sweet alert
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Data ini akan dihapus secara permanent!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus Saja!!'
          }).then((result) => {
            if (result.isConfirmed) {

                //delete
                Inertia.delete(`${URL}/${id}`)

                Swal.fire({
                    title: 'Success!',
                    text: 'Data deleted successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
          })
    }

    return (
    	<>
    		<button onClick={() => destroy(id)} className="btn btn-danger btn-sm"><TbTrashXFilled /></button>
    	</>
    )

}