import { useState, useEffect } from "react";
import "./jobs.scss";
import {} from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Button from "@mui/material/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import httpModule from "../../../helpers/http.module";
import { ICreateCompanyDto, ICreateJobDto } from "../../types/global.typing";

interface IParams extends Record<string, string | undefined> {
    id: string;
  }
  

const UpdateJob = () => {
const { jobId } = useParams<IParams>();
console.log('vvvvv',jobId);

const [job, setJob] = useState<ICreateJobDto>({ title: "", level: "",companyId:"" });
const redirect = useNavigate();

useEffect(() => {
    httpModule
    .get("/Job/"+jobId)
    .then((response) => setJob(response.data))
    .catch((error) => console.log(error));
    }, [jobId]);

const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "") {
    alert("Fill all fields");
    return;
    }
    httpModule
    .put(`/company/Update/${jobId}`, job)
    .then((responst) => redirect("/jobs"))
    .catch((error) => console.log(error));
};

const handleClickBackBtn = () => {
redirect("/jobs");
};

return (
<div className="content">
<div className="update-job">
<h2>Update Job</h2>
<TextField
autoComplete="off"
label="Job title"
variant="outlined"
value={job.title}
onChange={(e) => setJob({ ...job, title: e.target.value })}
/>
<FormControl fullWidth>
<InputLabel>Company level</InputLabel>
<Select
value={job.level}
label="Job level"
onChange={(e) => setJob({ ...job, level: e.target.value })}
>{
   [ "Intern", "Junior", "MidLevel", "Senior", "TemLead", "Cto", "Architect" ]
   .map(val=><MenuItem value={val}>{val}</MenuItem>)
}

</Select>
</FormControl>
<div className="btns">
<Button variant="outlined" color="primary" onClick={handleClickSaveBtn}>
Save
</Button>
<Button variant="outlined" color="secondary" onClick={handleClickBackBtn}>
Back
</Button>
</div>
</div>
</div>
);
};

export default UpdateJob;