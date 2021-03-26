using System;

namespace Domain
{
    public class PhotoRequest
    {
        public int Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string Item { get; set; }
        public string Type { get; set; }
        public string Activity { get; set; }
        public string Request { get; set; }
    }
}