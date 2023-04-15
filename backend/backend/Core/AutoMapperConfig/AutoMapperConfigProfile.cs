﻿using AutoMapper;
using backend.Core.Dtos.Company;
using backend.Core.Dtos.Job;
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

            CreateMap<JobCreateDto, Job>();
            CreateMap<Job, JobGetDto>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name));


            //Candidate

        }
    }
}
