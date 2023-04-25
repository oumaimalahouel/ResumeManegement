using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Dtos.Job;
using backend.Core.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {

        private ApplicationDbContextcs _context { get; }
        private IMapper _mapper { get; }

        public JobController(ApplicationDbContextcs context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD 

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateJob([FromBody] JobCreateDto dto)
        {
            var newJob = _mapper.Map<Job>(dto);
            await _context.jobs.AddAsync(newJob);
            await _context.SaveChangesAsync();

            return Ok(new { id = newJob.ID, message = "Job Saved Successfully" });
        }

        // Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<JobGetDto>>> GetJobs()
        {
            var jobs = await _context.jobs.Include(job => job.Company).OrderByDescending(q => q.CreatedAt).ToListAsync();
            var convertdJobs = _mapper.Map<IEnumerable<JobGetDto>>(jobs);

            return Ok(convertdJobs);
        }


        // Get by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<JobGetDto>> GetJobById(long id)
        {
            var job = await _context.jobs.FindAsync(id);

            if (job == null)
            {
                return NotFound();
            }


            var jobDto = _mapper.Map<JobGetDto>(job);

            return Ok(jobDto);
        }
        // Update
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateJob(long id, JobUpdateDto dto)
        {
            var jobToUpdate = await _context.jobs.FindAsync(id);

            if (jobToUpdate == null)
            {
                return NotFound();
            }

            // Update job properties with new values
            jobToUpdate.Title = dto.Title;
            jobToUpdate.Level = dto.Level;
          

            // Save changes to database
            await _context.SaveChangesAsync();

            return Ok(new { id = jobToUpdate.ID, Message = "Job updated successfully" });
        }

        // Delete
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteJob(long id)
        {
            var jobToDelete = await _context.jobs.FindAsync(id);

            if (jobToDelete == null)
            {
                return NotFound();
            }

            _context.jobs.Remove(jobToDelete);

            await _context.SaveChangesAsync();

            return Ok(new { id = jobToDelete.ID, Message = "Job updated successfully" });
        }

    }
}
