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

        //[TestMethod()]
        public void GetTest()
        {
            //Get 성공했다 하지만 이게 맞는지 확인을 받자.
            var con = new MovieAPICon();
            var getResult = con.Get();
            
        }

        //[TestMethod()]
        public void deleteTest()
        {
            //Delete 성공
            var con = new MovieAPICon();
            var delResult = con.Delete(31);

            if(delResult == true)
            {
                Console.Write("success");
            }
            else
            {
                Console.Write("fali");
            }
        }

        //[TestMethod()]
        public void postTest()
        {
            //Post 성공
            var con = new MovieAPICon();
            var postResult = con.Post(movie);

            Console.WriteLine(postResult);
        }

        [TestMethod()]
        public void putTest()
        {
            var con = new MovieAPICon();
            //Put 오류가 나지는 않지만 수정이 되질 않는다. 왜??
            var putResult = con.Edit(movie);
            
                Console.WriteLine("suc");
        }


    }
}