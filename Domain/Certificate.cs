using System;

namespace Domain
{
    public class Certificate
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Level { get; set; }
        public string Description { get; set; }
        public string Remark { get; set; }
    }
}