using System;
<<<<<<< HEAD
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
=======
using Domain;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            
<<<<<<< HEAD
         /*   using (var scope = host.Services.CreateScope())
=======
            using (var scope = host.Services.CreateScope())
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
            {
                var services = scope.ServiceProvider;
                try 
                
                {
                    var context = services.GetRequiredService<DataContext>();
<<<<<<< HEAD
                    context.Database.Migrate();
                    Seed.SeedData(context);
=======
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                  //  context.Database.Migrate();
                    Seed.SeedData(context, userManager, roleManager).Wait();
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured during migration");
                }
            }
<<<<<<< HEAD
         */
=======
         
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
