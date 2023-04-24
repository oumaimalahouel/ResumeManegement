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

            return Ok(new { id = newComapany.ID, message = "Company Saved Successfully" });
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



        // Read by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyGetDto>> GetCompanyById(long id)
        {
            var company = await _context.companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

          
            var companyDto = _mapper.Map<CompanyGetDto>(company);

            return Ok(companyDto);
        }

        // Update
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateCompany(int id, [FromBody] CompanyUpdateDto dto)
        {
            // Convertir l'id en long
            long idLong = (long)id;

            // Trouver l'entité Company correspondante
            Company company = await _context.companies.FindAsync(idLong);

            if (company == null)
            {
                return NotFound();
            }







            // Mettre à jour les propriétés de l'entité avec les valeurs du DTO
            company.Name = dto.Name;
            company.Size = dto.Size;
        

            // Enregistrer les modifications
            await _context.SaveChangesAsync();

            return Ok(new { ID = company.ID, Message = "Company updated successfully" });
        }

        // Delete
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.companies.FindAsync((long)id);
            if (company == null)
            {
                return NotFound();
            }

            _context.companies.Remove(company);
            await _context.SaveChangesAsync();

            return Ok(new { ID = company.ID, Message = "Company updated successfully" });
        }

    }
}
