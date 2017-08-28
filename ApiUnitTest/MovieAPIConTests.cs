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

        MovieAPICon con = new MovieAPICon();

        Movie postData =
            new Movie
            {
                Title = "BAAAM",
                ReleaseDate = DateTime.Parse("2017-08-28 18:09"),
                Genre = "Auction",
                Rating = "PG",
                Price = 55,
                Review = "GOOOD"
            };

        [TestMethod()]
        public void GetTest()
        {
            //Get 역직렬화 에러라고 뜬다. 왜?
            var getResult = con.Get(); 

            if(getResult == true)
            {
                Console.WriteLine("Success");
            }
            else
            {
                Console.WriteLine("Fail");
            }
            
        }

        [TestMethod()]
        public void deleteTest()
        {
            //Delete 성공
            var delResult = con.Delete(29);

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
        public void postTest()
        {
            //Post 성공
            var postResult = con.Post(postData);

            if(postResult == true)
            {
                Console.WriteLine("Success");
            }
            else
            {
                Console.WriteLine("Fail");
            }
        }

        [TestMethod()]
        public void putTest()
        {
            //Put 오류가 나지는 않지만 수정이 되질 않는다. 왜??

            var putResult = con.Put(31, postData);

            if (putResult == true)
            {
                Console.WriteLine("Success");
            }
            else
            {
                Console.WriteLine("Fail");
            }
        }


    }
}