import internal from "stream";

export interface Product {
        id: number;
        type?: string;
        name: string;
        rating?:number;
        review?:string;
        imgURL: string;
        price: number;
        description: string;
        specialization?: string;
}

//  public int Id{ get; set; }
// public string Type { get; set; }
// public string Name { get; set; }
// public int Rating { get; set; }
// public string Review { get; set; }
// public string ImgURL { get; set; }
// public string Category { get; set; }
// public double Price { get; set; }
// public string Description { get; set; }
// public string Specialization { get; set; } 