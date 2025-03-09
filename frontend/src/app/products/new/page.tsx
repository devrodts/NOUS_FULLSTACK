"use client"

import AddModal from "@/components/molecules/AddModal/AddModal";
import { useState } from "react";
import { Typography } from "@mui/material"; 

export default function NewProduct(){
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
            <AddModal 
                open={open} 
                onClose={handleClose}  
                onOpen={handleOpen}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
            </AddModal>    
        </>
    )
}