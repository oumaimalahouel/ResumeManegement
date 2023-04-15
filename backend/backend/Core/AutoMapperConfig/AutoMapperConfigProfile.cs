using AutoMapper;
using backend.Core.Dtos.Company;
using backend.Core.Entites;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            //Company
            CreateMap<CompanyCreateDto, Company>();
            CreateMap<Company, CompanyGetDto>();
            //Job




            //Candidate

        }
    }
}
