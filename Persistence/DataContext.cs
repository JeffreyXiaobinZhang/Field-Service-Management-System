﻿using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<Value> Values { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<SORList> SORLists { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }
        public DbSet<Technician> Technicians { get; set; }
        public DbSet<TaskAssignment> TaskAssignments { get; set; }
        public DbSet<ProjectLog> ProjectLogs { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<WarehouseLog> WarehouseLogs { get; set; }
        public DbSet<ProjectStock> ProjectStocks { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Certificate> Certificates { get; set; }
        public DbSet<TechnicianCertificate> TechnicianCertificates { get; set; }
        public DbSet<ThirdParty> ThirdParties { get; set; }
        public DbSet<ProjectVendor> ProjectVendors { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<SORList>()
                .HasKey(c => new { c.Name, c.JobType });

            builder.Entity<ProjectStock>()
                .HasKey(c => new { c.ProjectId, c.PartNo });

            builder.Entity<ThirdParty>()
                .HasKey(c => new { c.CompanyName });
        }
    }
}
