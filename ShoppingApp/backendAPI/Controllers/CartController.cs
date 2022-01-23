using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backendAPI.Data;
using backendAPI.DTOs;
using backendAPI.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backendAPI.Controllers
{
    public class CartController : BaseApiController
    {
        public StoreContext _context;
        public CartController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet(Name ="GetCart")]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await RetrieveCart();

            if (cart == null)
            {
                return NotFound();
            }

            return MappingCartToDto(cart);
        }

       

        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity)
        {
            var cart = await RetrieveCart();
            if (cart == null) cart = CreateCart();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            cart.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return CreatedAtRoute("GetCart",MappingCartToDto(cart));
            }
            return BadRequest(new ProblemDetails { Title = "Problem saving the Item in cart" });

        }


        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            var cart = await RetrieveCart();
            if (cart == null) return NotFound();
            cart.deleteItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;

           if(result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem Removing item from the cart"});
        }

        private async Task<Cart> RetrieveCart()
        {
            return await _context.Carts
                            .Include(i => i.Items)
                            .ThenInclude(p => p.Product)
                            .FirstOrDefaultAsync(b => b.BuyingId == Request.Cookies["buyingId"]);
        }

        private Cart CreateCart()
        {
            var buyingId = Guid.NewGuid().ToString();
            var cookiesOpt = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyingId", buyingId, cookiesOpt);
            var cart = new Cart { BuyingId = buyingId };
            _context.Carts.Add(cart);
            return cart;
        }
        private CartDto MappingCartToDto(Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
                BuyingId = cart.BuyingId,
                Items = cart.Items.Select(item => new CartItemDto
                {
                    ProductId = item.ProductId,
                    Type = item.Product.Type,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    ImgURL = item.Product.ImgURL,
                    Quantity = item.Quantity
                }).ToList()

            };
        }
    }
}
