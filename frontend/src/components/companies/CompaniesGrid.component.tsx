import "./companies-grid.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import React from "react";
import { ICompany } from "../types/global.typing";
import { Button } from "@mui/material"
import UpdateCompany from "../pages/CompaniesPages/UpdateCompany.page";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import httpModule from "../../helpers/http.module";



interface ICompaniesGridProps {
   data: ICompany[];
   actions: { label: string; onClick: (id: string) => void }[];
}

const handleDelete = (companyId:number)=>{
   httpModule
   .delete("/Company/delete/"+companyId)
   .then((response) => window.location.reload())
   .catch((error) => console.log(error));
}
const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
   const redirect = useNavigate();
   const column: GridColDef[] = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "Name", width: 250 },
      { field: "size", headerName: "Size", width: 150 },
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
                  redirect("/companies/update/"+params.row.id)}}>
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
      <Box sx={{ width: "60%", height: 650}} className="companies-grid">
         <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50} />
      </Box>
   );
};

export default CompaniesGrid;