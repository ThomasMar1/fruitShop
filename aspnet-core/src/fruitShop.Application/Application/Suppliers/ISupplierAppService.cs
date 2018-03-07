
using System;
using System.Collections.Generic;
using System.Text;
using fruitShop.Domain;
using fruitShop.Application.Suppliers.Dto;
using Abp.Application.Services;
using System.Threading.Tasks;

namespace fruitShop.Application.Suppliers
{
    public interface ISupplierAppService : IAsyncCrudAppService<SupplierDto, Int32, SupplierDto, addSupplierDto, updateSupplier>
    {
        Task<Boolean> addFruit(addFruitDto addfruitDto);

        Task<Boolean> updateFruit(updateFruitDto updatefruitDto);

        Task<Boolean> deleteFruit(deleteFruitDto deletefruitDto);

        Task<List<SupplierFruitDto>> GetFruits(Int32 supplierId);

        Task<List<SupplierFruitDto>> GetAFruit(Int32 fruitId, Int32 supplierId);





    }


}