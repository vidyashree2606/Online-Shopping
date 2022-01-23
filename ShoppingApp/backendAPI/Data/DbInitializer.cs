using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backendAPI.Entities;
using Microsoft.AspNetCore.Identity;

namespace backendAPI.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context,UserManager<User> userManager)
        {
            if(context.Products.Any()) return;
            if (!userManager.Users.Any())
            {

                var user = new User
                {
                    UserName = "vidyashree",
                    Email = "vidyap@gmail.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "vidyap",
                    Email = "vidyap@gmail.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });


            }
            var products = new List<Product>{
                new Product
                {
                    Type = "apparel",
                    Name = "Hat",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Clothes/apparel-cowboy-hat.png",
                    Description =
                        "1) Brand - FabSeasons 2) Material- Polyester 3) 10 Years and Above 4) Classy Hat For Multipurpose Use 5) Long Brim for better protection from Sunlight.",
                    Price = 500,
                    Specialization = "Clothes"
                },
                new Product
                {
                     Type = "apparel",
                    Name = "Suit",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Clothes/apparel-suit.png",
                    Description =
                        "Men’s suit fabric from which they are made, including its color and weight; the style or cut of the suit; the details or trimming applied; the degree of customization to its wearer,",
                    Price = 8500,
                    Specialization = "Clothes"
                },
                new Product
                {
                     Type = "apparel",
                    Name = "Hoodie",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Clothes/apparel-hoodie.png",
                    Description =
                        "Soft hoodie levis Prior to the Levi Strauss patented sweatshirt, jacket, hoodie, the term hoodie had been long in use for various garments (including trousers, overalls, and coats), constructed from blue-colored denim.",
                    Price = 2000,
                    Specialization = "Clothes"
                },
                new Product
                {
                    Type = "apparel",
                    Name = "Jacket",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Clothes/apparel-leather jacket.png",
                    Description =
                        "denim or dungaree cloth. ... Prior to the Levi Strauss patented trousers, the term blue jeans had been long in use for various garments (including trousers, overalls, and coats), constructed from blue-colored denim.",
                    Price = 3000,
                    Specialization = "Clothes"
                },
                new Product
                { Type = "apparel",
                    Name = "Jeans",
                    Rating = 5,
                    Review = "Good",
                    ImgURL = "/images/products/Clothes/apparel-jeans.png",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 2999,
                    Specialization = "Clothes"
                },
                new Product
                {
                     Type = "Electronic",
                    Name = "Electric Kettle",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Electronic/Electric_Kettle.png",
                    Description =
                        "Macmillan Aquafresh Electric Kettle is a classic and cool looking appliance like this can be a great addition to any modern kitchen. Material This kettle features a stainless steel body which makes it rust-resistant, sturdy and durable.",
                    Price = 2500,
                    Specialization = "Electronic"
                },
                new Product
                {
                     Type = "Electronic",
                    Name = "Laptop",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Electronic/laptop.png",
                    Description =
                        "This Dell laptop features the 11th Gen processor and PCIe NVMe Solid State Drives and QHD+ IPS Anti-glare display so that you can enjoy a powerful performance in every way. This way, you can enjoy movies, music, and more. And, with its ComfortView Plus Display, blue light emission will be reduced so that you can enjoy a comfortable viewing experience.",
                    Price = 65000,
                    Specialization = "Electronic"
                },
                new Product
                {
                     Type = "Boards",
                    Name = "Hairdryer",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Electronic/Hairdryer.png",
                    Description =
                        "2 years manufacturer warranty.2 heat settings. 2 speed settings. Wattage: 1000 W",
                    Price = 1999,
                    Specialization = "Electronic"
                },
                new Product
                {
                     Type = "Electronic",
                    Name = "Headphone",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Electronic/Headphone.png",
                    Description =
                        "The boAt BassHeads 900 Super Extra Bass wired headset is a handsomely crafted, feather-light performer that lets you enjoy your favourite tunes with a punchy bass and crystal-clear sound. An amalgamation of style with performance, this headset’s powerful 40mm Neodymium drivers effectively reproduce sound in a balanced manner",
                    Price = 2500,
                    Specialization = "Electronic"
                },
                new Product
                {
                     Type = "Electronic",
                    Name = "Tv",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Electronic/Tv.png",
                    Description =
                        "1 Year LG India Comprehensive Warranty and additional 1 year Warranty is applicable on panel/module. Simplink (HDMI-CEC), Smart Energy Saving, Intelligent Sensor, USB 2.0 Playback (Music, Movies, Images).",
                    Price = 34000,
                    Specialization = "Electronic"
                },
                new Product
                {
                    Type = "personal-care items",
                    Name = "Cream",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/HealthCare/Cream.png",
                    Description =
                        "Inspired by the illuminate trend, Lakme s Perfect Radiance range is now elevated to a new level of luxury and efficacy. This Skin Brightening Night Crme with precious micro-crystals and skin Brightening vitamins, intensely nourishes and Brightens your skin through the night.",
                    Price = 699,
                    Specialization = "HealthCare"
                },
                new Product
                {
                    Type = "personal-care items",
                    Name = "LiquidSoap",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/HealthCare/LiquidSoap.png",
                    Description =
                        "Instant Hand Sanitizer: Kills 99.9% germs in 10 seconds. Recommended by Indian Medical Association (IMA). Alcohol-based: Contains 72% alcohol for effective germ protection. Non-Sticky: This gel-based sanitizer dries off easily and is non-sticky. Soft on Hands: Dermatologically Tested. Easy to Use: Place 500ml bottle at entrances, tables, or any convenient location.",
                    Price = 200,
                    Specialization = "HealthCare"
                },
                new Product
                {
                     Type = "personal-care items",
                    Name = "Hand Sanitizer",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/HealthCare/Sanitizer.png",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 150,
                    Specialization = "HealthCare"
                },
                new Product
                {
                    Type = "personal-care items",
                    Name = "Mumma Earth Shampoo",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/HealthCare/Shampoo.png",
                    Description =
                        "Mumma Earth is the No.1 Shampoo Brand recommended by dermatologists. It is pH balanced and mild on skin making it suitable for all skin types. It has gentle cleansers which are suitable for dry and sensitive skin also. It cares for your skin and washes away germs.",
                    Price = 320,
                    Specialization = "HealthCare"
                },
                new Product
                {
                     Type = "personal-care items",
                    Name = "Dove Soap",
                    Rating = 5,
                    Review = "Good",
                    ImgURL = "/images/products/HealthCare/Soap.png",
                    Description =
                        "Dove is the No.1 Soap Brand recommended by dermatologists. It is pH balanced and mild on skin making it suitable for all skin types. It has gentle cleansers which are suitable for dry and sensitive skin also. It cares for your skin and washes away germs.",
                    Price = 30,
                    Specialization = "HealthCare"
                },
                new Product
                {
                     Type = "Boards",
                    Name = "Comdey",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Books/Comedy.png",
                    Description =
                        " Books in the comedy genre can also be about a particular quirky character that is funny or amusing.The comedy genre is versatile like drama and romance, as it can be crossed or meshed with almost every other genre.",
                    Price = 99,
                    Specialization = "Books"
                },
                new Product
                {
                    Type = "Boards",
                    Name = "Motivation Book",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Books/Decision_Maker.png",
                    Description =
                        "Decision Maker by Dr Murphy is a book that shows you how the power of believing in yourself can help you achieve success. It explains how you will be able to manipulate the subconscious mind using a belief until you develop a subjective compulsion to succeed.",
                    Price = 200,
                    Specialization = "Books"
                },
                new Product
                {
                    Type = "Books",
                    Name = "Horror Book",
                    Rating = 3,
                    Review = "Good",
                    ImgURL = "/images/products/Books/London_Horror.png",
                    Description =
                        "horror story, a story in which the focus is on creating a feeling of fear. Such tales are of ancient origin and form a substantial part of the body of folk literature. They can feature supernatural elements such as ghosts, witches, or vampires, or they can address more realistic psychological fears.",
                    Price = 350,
                    Specialization = "Books",
                },
                 new Product
                {
                    Type = "Books",
                    Name = "Apj abdul kalam Book",
                    Rating = 5,
                    Review = "Excellent",
                    ImgURL = "/images/products/Books/Wings_of_fire.png",
                    Description =
                        "The book Wings of Fire, the autobiography of A P J Abdul Kalam constitutes an extraordinary reading for all ages. In this book, the authors tell us the story of a young Muslim boy who has big dreams about his future and what inspires him to become an eminent scientist.",
                    Price = 250,
                    Specialization = "Books",
                },
                 new Product
                {
                    Type = "Books",
                    Name = "Yoga Book",
                    Rating = 4,
                    Review = "Good",
                    ImgURL = "/images/products/Books/Yoga.png",
                    Description =
                        "Mia Randall has been practicing meditation and yoga for over 20 years and is a passionate advocate of the health benefits of regular practice. She writes to bring joy and inspiration to herself and others. In her spare time she enjoys reading Kindle books, cooking and tweeting (@mettamia) Mia thanks her readers for supporting her writing.",
                    Price = 210,
                    Specialization = "Books",
                },
            };

            foreach(var product in products){
                context.Products.Add(product);
            }
            context.SaveChanges();
        }
    }
}