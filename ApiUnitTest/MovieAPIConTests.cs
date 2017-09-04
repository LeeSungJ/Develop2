using Microsoft.VisualStudio.TestTools.UnitTesting;
using MovieAPI.Model;
using RealTest.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieAPI.Model.Tests
{
    [TestClass()]
    public class MovieAPIConTests
    {
        Movie movie =
            new Movie
            {
                ID = 39,
                Title = "BaseBall",
                ReleaseDate = DateTime.Parse("2017-08-28 18:09"),
                Genre = "Auction",
                Rating = "PG",
                Price = 55,
                Review = "GOOOD"
            };

        [TestMethod()]
        public void GetTest()
        {
            var apiService = new MovieAPIService();  
            var getResult = apiService.GetMovies("Action","e");

            Console.Write(getResult);
        }

        [TestMethod()]
        public void GetGenres()
        {
            var apiService = new MovieAPIService();
            var genre = apiService.GetGenres();

            Console.Write(genre);
        }

        [TestMethod()]
        public void GetMovieId()
        {
            int id = 20;
            var apiService = new MovieAPIService();
            var genre = apiService.GetMovie(id);

            Console.Write(genre);
        }

        [TestMethod()]
        public void DeleteTest()
        {
            var apiService = new MovieAPIService();
            var delResult = apiService.DeleteMovie(null);

            if(delResult == true)
            {
                Console.Write("success");
            }
            else
            {
                Console.Write("fali");
            }
        }

        [TestMethod()]
        public void PostTest()
        {
            var apiService = new MovieAPIService();
            var postResult = apiService.PostMovie(movie);

            Console.WriteLine(postResult);
        }

        [TestMethod()]
        public void PutTest()
        {
            var apiService = new MovieAPIService();
            var putResult = apiService.EditMovie(movie);

            Console.WriteLine("suc");
        }
    }
}