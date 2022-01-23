using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.DTOs
{
    public class CartDto
    {
        public int Id {get;set;}

        public string BuyingId {get;set;}
        public List<CartItemDto> Items {get;set;}

    }
}