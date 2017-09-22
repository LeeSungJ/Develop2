using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Text.RegularExpressions;

namespace RealTest.Model
{
	class checkValidation
	{
		string titleFormat = @"^[A-Z]{1}[A-Za-z]{2,59}$";
		//string dateFormat = @"^ (20[1-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2] [0-9]|3[0-1])$";
		string stringFormat = @"^[A-Z]{1}[A-Za-z]{2,4}$";
		string genreFormat = @"^[A-Z]{1}[A-Za-z]{2,29}$";
		//string priceFormat = @"^[0-9]{1,2}$";

		public bool validationCheck(Movie movie)
		{
			var title = movie.Title;
			//var date = movie.ReleaseDate;
			var genre = movie.Genre;
			//var price = movie.Price;
			var rating = movie.Rating;
			var review = movie.Review;

			var titleCheck = Regex.IsMatch(title, titleFormat);
			//var dateCheck = Regex.IsMatch(date.ToString(), dateFormat);
			var genreCheck = Regex.IsMatch(genre, genreFormat);
			//var priceCheck = Regex.IsMatch(price.ToString(), priceFormat);
			var ratingCheck = Regex.IsMatch(rating, stringFormat);
			var reviewCheck = Regex.IsMatch(review, stringFormat);

			if (titleCheck == false || genreCheck == false || ratingCheck == false || reviewCheck == false)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
	}
}
