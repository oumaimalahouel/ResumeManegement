import { useState, useEffect } from "react";

import {} from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Button from "@mui/material/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import httpModule from "../../../helpers/http.module";
import { ICreateCandidateDto } from "../../types/global.typing";

interface IParams extends Record<string, string | undefined> {
    id: string;
  }
  

const Updatecandidate = () => {
const { candidateId } = useParams<IParams>();


const [candidate, setcandidate] = useState<ICreateCandidateDto>({ firstName: "", lastName: "",email:"" ,phone:"" ,coverLetter:"" ,jobId:""});
const redirect = useNavigate();
const [pdfFile, setPdfFile] = useState<File | null>();

useEffect(() => {
    httpModule
    .get("/candidate/"+candidateId)
    .then((response) => setcandidate(response.data))
    .catch((error) => console.log(error));
    }, [candidateId]);

const handleClickSaveBtn = () => {
    if (candidate.firstName === "" ||
    candidate.lastName === "" ||
    candidate.email === "" ||
    candidate.phone === "" ||
    candidate.coverLetter === "" ||
    candidate.jobId === "" ||
    !pdfFile) {
    alert("Fill all fields");
    return;
    }
    httpModule
    .put(`/Candidate/Update/${candidateId}`, candidate)
    .then((responst) => redirect("/candidates"))
    .catch((error) => console.log(error));
};

const handleClickBackBtn = () => {
redirect("/candidates");
};

return (
<div className="content">
<div className="update-candidate">
<h2>Update candidate</h2>
<TextField
autoComplete="off"
label="firstName"
variant="outlined"
value={candidate.firstName}
onChange={(e) => setcandidate({ ...candidate, firstName: e.target.value })}

/>
<TextField
autoComplete="off"
label="lastName"
variant="outlined"
value={candidate.lastName}
onChange={(e) => setcandidate({ ...candidate, lastName: e.target.value })}

/>
<TextField
autoComplete="off"
label="email"
variant="outlined"
value={candidate.email}
onChange={(e) => setcandidate({ ...candidate, email: e.target.value })}

/>

<TextField
autoComplete="off"
label="phone"
variant="outlined"
value={candidate.phone}
onChange={(e) => setcandidate({ ...candidate, phone: e.target.value })}

/>

<TextField
autoComplete="off"
label="coverLetter"
variant="outlined"
value={candidate.coverLetter}
onChange={(e) => setcandidate({ ...candidate, coverLetter: e.target.value })}

/>
<input type="file" onChange={(event) => setPdfFile(event.target.files ? event.target.files[0] : null)} />

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

export default Updatecandidate;