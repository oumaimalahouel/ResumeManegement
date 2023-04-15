using backend.Core.Entites;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Context
{
    public class ApplicationDbContextcs : DbContext
    {
        public ApplicationDbContextcs(DbContextOptions<ApplicationDbContextcs> options) : base(options)
        {
        
        }
        public DbSet<Company>companies { get; set; }
        public DbSet<Job> jobs { get; set; }    
        public DbSet<Candidate> candidates { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Job>()
                .HasOne(job => job.Company)
                .WithMany(company => company.Jobs)
                .HasForeignKey(job => job.CompanyId);

            modelBuilder.Entity<Candidate>()
                .HasOne(candidate => candidate.Job)
                .WithMany(job => job.candidates)
                .HasForeignKey(candidate => candidate.JobId);
            modelBuilder.Entity<Company>()
               .Property(company => company.Size)
               .HasConversion<string>();

            modelBuilder.Entity<Job>()
               .Property(job => job.Level)
               .HasConversion<string>();

        }
    }
}
