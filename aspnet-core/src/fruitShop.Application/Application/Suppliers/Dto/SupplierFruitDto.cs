using System;
using System.Collections.Generic;
using System.Text;
using Abp.AutoMapper;
using fruitShop.Domain;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;


namespace fruitShop.Application.Suppliers.Dto
{
    public class SupplierFruitDto
    {
        public string name { get; set; }
        public string colour { get; set; }
        public decimal Price { get; set; }
        public int fruitId { get; set; }


    }
}
