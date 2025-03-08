// import FileUploadButton from "@/components/atoms/FileUploadButton/FileUploadButton";
// import { Box, TextField, Button } from "@mui/material";
// import ClearIcon from '@mui/icons-material/Clear';

// interface ProductFormProps {
//   onSubmit: (data: any) => void;
//   onClose: () => void;
// }

// export default function ProductForm({ onSubmit, onClose }: ProductFormProps) {
//   return (
//     <form onSubmit={onSubmit}>
//       <Box display="flex" flexDirection="column" gap={2}>
//         <div style={{position:"relative", display:"flex", justifyContent:"flex-end", cursor:"pointer"}}>
//           <ClearIcon onClick={onClose} />
//         </div>
//         <TextField name="name" label="Name" />
//         <TextField name="price" label="Price" />
//         <TextField name="description" label="Description" />
//         <TextField name="image" label="Image" />
//         <FileUploadButton label="Upload Image" />
//         <Button type="submit" variant="contained" color="primary">
//           Add Product
//         </Button>
//       </Box>
//     </form>
//   );
// } 