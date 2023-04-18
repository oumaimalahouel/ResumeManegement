using backend.Core.Enums;

namespace backend.Core.Dtos.Job
{
    public class JobUpdateDto
    {
       
        public string Title { get; set; }
        public JobLevel Level { get; set; }
        
    }
}
