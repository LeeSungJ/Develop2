namespace RealTest.Migrations
{
    using RealTest.Model;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<RealTest.Model.MovieDBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "RealTest.Models.MovieDBContext";
        }

        protected override void Seed(RealTest.Model.MovieDBContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Movies.AddOrUpdate(i => i.Title,
        new Movie
        {
         
            Title = "About Time",
            ReleaseDate = DateTime.Parse("1999-1-11"),
            Genre = "Romantic Comedy",
            Rating = "PG",
            Price = 9.99M,
            Review = "GOOD"
        },

         new Movie
         {
         
             Title = "Ghostbusters ",
             ReleaseDate = DateTime.Parse("1984-3-13"),
             Genre = "Comedy",
             Price = 8.99M,
             Review = "GOOD"
         }
   );

        }
    }
}
