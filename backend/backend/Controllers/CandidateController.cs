using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Candidate;
using backend.Core.Dtos.Job;
using backend.Core.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private ApplicationDbContextcs _context { get; }
        private IMapper _mapper { get; }

        public CandidateController(ApplicationDbContextcs context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        // CRUD 

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto dto, IFormFile pdfFile)
        {
            // Firt => Save pdf to Server
            // Then => save url into our entity
            var fiveMegaByte = 5 * 1024 * 1024;
            var pdfMimeType = "application/pdf";

            if (pdfFile.Length > fiveMegaByte || pdfFile.ContentType != pdfMimeType)
            {
                return BadRequest("File is not valid");
            }

            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", resumeUrl);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }
            var newCandidate = _mapper.Map<Candidate>(dto);
            newCandidate.ResumeUrl = resumeUrl;
            await _context.candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();

            return Ok(new { id = newCandidate.ID, message = "Candidate Saved Successfully" });
        }
        // Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidates()
        {
            var candidates = await _context.candidates.Include(c => c.Job).OrderByDescending(q => q.CreatedAt).ToListAsync();
            var convertedCandidates = _mapper.Map<IEnumerable<CandidateGetDto>>(candidates);

            return Ok(convertedCandidates);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CandidateGetDto>> GetCandidateById(long id)
        {
            var candidate = await _context.candidates.FindAsync(id);

            if (candidate == null)
            {
                return NotFound();
            }


            var candidateDto = _mapper.Map<CandidateGetDto>(candidate);

            return Ok(candidateDto);
        }

        // Read (Download Pdf File)
        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File Not Found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }

        // Update
        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateCandidate(long id, [FromBody] CandidateUpdateDto dto)
        {
            var candidate = await _context.candidates.FindAsync(id);

            if (candidate == null)
            {
                return NotFound("Candidate not found");
            }

            // Update candidate properties
            candidate.FirstName = dto.FirstName;
            candidate.LastName = dto.LastName;
            candidate.Email = dto.Email;
            candidate.Phone = dto.Phone;
            candidate.CoverLetter = dto.CoverLetter;
            candidate.JobId = dto.JobId;
            candidate.ResumeUrl = dto.ResumeUrl;

            _context.candidates.Update(candidate);
            await _context.SaveChangesAsync();

            return Ok(new { ID = candidate.ID, Message = "Candidate updated successfully" });

        }
        // Delete
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteCandidate(long id)
        {
            var candidate = await _context.candidates.FindAsync(id);

            if (candidate == null)
            {
                return NotFound("Candidate not found");
            }

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", candidate.ResumeUrl);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            try
            {
                _context.candidates.Remove(candidate);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest("Cannot delete this candidate because they have related records in the database.");
            }

            return Ok(new { ID = candidate.ID, Message = "Candidate deleted successfully" });
        }


    }
}
