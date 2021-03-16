using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Joey",
                        UserName = "joey",
                        Email = "joey@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jeff",
                        UserName = "jeff",
                        Email = "jeff@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Suzy",
                        UserName = "suzy",
                        Email = "suzy@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tech",
                        UserName = "tech",
                        Email = "tech@test.com"
                    }
                };

                foreach (var usr in users) 
                {
                    await userManager.CreateAsync(usr, "Pa$$w0rd");
                }
            }

            IdentityResult roleResult;
            //Adding Admin Role
         //   var roleCheck = await roleManager.RoleExistsAsync("Admin");
            if (!roleManager.Roles.Any())
            {
                //create the roles and seed them to the database
                
                roleResult = await roleManager.CreateAsync(new IdentityRole("Admin"));
                roleResult = await roleManager.CreateAsync(new IdentityRole("Member"));
            }
            //Assign Admin role to the main User here we have given our newly registered
            //login id for Admin management
            var user = await userManager.FindByEmailAsync("joey@test.com");
            await userManager.AddToRoleAsync(user, "Admin");

            user = await userManager.FindByEmailAsync("jeff@test.com");
            await userManager.AddToRoleAsync(user, "Admin");

            user = await userManager.FindByEmailAsync("suzy@test.com");
            await userManager.AddToRoleAsync(user, "Admin");

            user = await userManager.FindByEmailAsync("tech@test.com");
            await userManager.AddToRoleAsync(user, "Member");

        }
    }
}