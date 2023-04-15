using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
       private ApplicationDbContextcs _context { get; }
        private IMapper _mapper { get; }

        public CompanyController(ApplicationDbContextcs contextcs,IMapper mapper)
        {
            _context = contextcs;
            _mapper = mapper;
        }
        //CRUD
        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCompany([FromBody]CompanyCreateDto dto)
        {
            Company newComapany = _mapper.Map<Company>(dto);
            await _context.companies.AddAsync(newComapany);
            await _context.SaveChangesAsync();

            return Ok("Companty Created Successfully");
        }



        // Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies()
        {
            var companies = await _context.companies.OrderByDescending(q => q.CreatedAt).ToListAsync();
            var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);

            return Ok(convertedCompanies);
        }

        //Update
        //Delete
    }
}
