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



const updateCompany=()=>{
   
}



interface ICompaniesGridProps {
   data: ICompany[];
   actions: { label: string; onClick: (id: string) => void }[];
}


const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
   const redirect = useNavigate();
   const column: GridColDef[] = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "size", headerName: "Size", width: 150 },
      {
         field: "createdAt",
         headerName: "Creation Time",
         width: 200,
         renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
         
      }, 
      {
         field: "update",
         headerName: "Update",
         width: 150,
         renderCell: (params) => {
            return(
               <Button variant="contained" color="primary" onClick={() =>{
                  redirect("/companies/update/"+params.row.id)
               } }>
                  Update
               </Button>
            )
         },},
   
   ];
   return (
      <Box sx={{ width: "100%", height: 450 }} className="companies-grid">
         <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50} />
      </Box>
   );
};

export default CompaniesGrid;