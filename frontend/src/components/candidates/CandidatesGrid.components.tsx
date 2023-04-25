import "./candidates-grid.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import React from "react";
import { ICandidate, ICompany } from "../types/global.typing";
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import httpModule from "../../helpers/http.module";
import { baseUrl } from "../../constats/url.constants";
import { PictureAsPdf } from "@mui/icons-material";



interface ICandidatesGridProps {
   data: ICandidate[];
   
}

const handleDelete = (companyId:number)=>{
   httpModule
   .delete("/Company/delete/"+companyId)
   .then((response) => window.location.reload())
   .catch((error) => console.log(error));
}
const CandidatesGrid = ({ data }: ICandidatesGridProps) => {
   const redirect = useNavigate();
   const column: GridColDef[] = [
   { field: "id", headerName: "ID", width: 100 },
   { field: "firstName", headerName: "First Name", width: 120 },
   { field: "lastName", headerName: "Last Name", width: 120 },
   { field: "email", headerName: "Email", width: 150 },
   { field: "phone", headerName: "Phone", width: 150 },
   { field: "coverLetter", headerName: "C V", width: 500 },

   {
      field: "resumeUrl",
      headerName: "Download",
      width: 150,
      renderCell: (params) => (
         <a href={`${baseUrl}/Candidate/download/${params.row.resumeUrl}`} download>
            <PictureAsPdf />
         </a>
      ),
   },

      {
         field: "createdAt",
         headerName: "Creation Time",
         width: 200,
         renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
         
      }, 
      {
         field: "update",
         headerName: "",
         width: 150,
         renderCell: (params) => {
            return(
            <>

               <IconButton aria-label="delete" color ="primary" onClick={() =>{
                  redirect("/Candidates/update/"+params.row.id)}}>
                  <EditIcon  color="primary"/>
               </IconButton>



         
               
               <IconButton aria-label="delete" color="error" onClick={()=>handleDelete(params.row.id)}>
                  <DeleteOutlineOutlinedIcon />
               </IconButton>
               
               </>
            )

         },
         
      },

   
   ];
   return (
      <Box sx={{ width: "60%", height: 650}} className="Candidates-grid">
         <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50} />
      </Box>
   );
};

export default CandidatesGrid;