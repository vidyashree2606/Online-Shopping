namespace backendAPI.DTOs
{
    public class CartItemDto
    {
        public int ProductId {get;set;}
        public string Type { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ImgURL { get; set; }
        public int Quantity { get; set; }
    }
}