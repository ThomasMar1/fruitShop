using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text;
using fruitShop.Application.Suppliers.Dto;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Microsoft.EntityFrameworkCore;
using fruitShop.Domain;
using Abp.EntityFrameworkCore.Repositories;
using fruitShop.EntityFrameworkCore;
using System.Linq;
using Abp.UI;

namespace fruitShop.Application.Suppliers
{
    public class SupplierAppService : AsyncCrudAppService<supplier, SupplierDto, Int32, SupplierDto, addSupplierDto, updateSupplier>, ISupplierAppService
    {
        public SupplierAppService(IRepository<supplier, Int32> Repo) : base(Repo)
        {

        }

        public async Task<Boolean> addFruit(addFruitDto request)
        {
            this.Lookupfruit(request.fruitId);                                              //check if fruit exists
            supplier s = await this.Repository.GetAsync(request.supplierId);                //read the supplier
            if (s == null) throw new UserFriendlyException("Unable to find supplier");
            this.ExpandSupplierEntity(s);                                                   //load supplier fruits
            if (s.SupplierFruits.Any(x => x.fruitId == request.fruitId))                    //check if fruit alreayd exists
            {
                throw new UserFriendlyException("Supplier already got this fruit");
            }

            SupplierFruit sf = new SupplierFruit(s)
            {

                fruitId = request.fruitId,
                Price = request.Price,

            };

            s.SupplierFruits.Add(sf);

            await CurrentUnitOfWork.SaveChangesAsync();
            return true;


        }

        public async Task<Boolean> updateFruit(updateFruitDto request)
        {
            supplier s = await this.Repository.GetAsync(request.supplierId);                //read the supplier
            if (s == null) throw new UserFriendlyException("Unable to find supplier");
            this.ExpandSupplierEntity(s);                                                   //load supplier fruits
            SupplierFruit sf = (s.SupplierFruits.FirstOrDefault(x => x.fruitId == request.fruitId));                   //check if fruit already exists

            if (sf == null)
            {
                throw new UserFriendlyException("Supplier already got this fruit");

            }


            sf.Price = request.Price;


            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<Boolean> deleteFruit(deleteFruitDto request)
        {
            supplier s = await this.Repository.GetAsync(request.supplierId);                //read the supplier
            if (s == null) throw new UserFriendlyException("Unable to find supplier");
            this.ExpandSupplierEntity(s);                                                   //load supplier fruits
            SupplierFruit sf = (s.SupplierFruits.FirstOrDefault(x => x.fruitId == request.fruitId));                   //check if fruit alreayd exists

            if (sf == null)
            {
                throw new UserFriendlyException("Supplier already got this fruit");

            }


            s.SupplierFruits.Remove(sf);


            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<List<SupplierFruitDto>> GetFruits(Int32 supplierId)
        {
           CheckPermission(GetPermissionName);
           fruitShopDbContext fruitContext = (fruitShopDbContext)base.Repository.GetDbContext();
           IQueryable<SupplierFruitDto> entityQuery =
           from SupplierFruit in fruitContext.SupplierFruits
           where supplierId == SupplierFruit.supplierId
           select new SupplierFruitDto
           {
               name = SupplierFruit.fruit.name,
               colour = SupplierFruit.fruit.colour,
               Price = SupplierFruit.Price,
               fruitId = SupplierFruit.fruitId

           };

            return await entityQuery.ToListAsync();
        }

        public async Task<List<SupplierFruitDto>> GetAFruit(Int32 fruitId,Int32 supplierId)
        {
            CheckPermission(GetPermissionName);
            fruitShopDbContext fruitContext = (fruitShopDbContext)base.Repository.GetDbContext();
            IQueryable<SupplierFruitDto> entityQuery =
            from SupplierFruit in fruitContext.SupplierFruits
            where supplierId == SupplierFruit.supplierId && fruitId == SupplierFruit.fruitId
            select new SupplierFruitDto
            {
                name = SupplierFruit.fruit.name,
                colour = SupplierFruit.fruit.colour,
                Price = SupplierFruit.Price,
                fruitId = SupplierFruit.fruitId

            };

            return await entityQuery.ToListAsync();
        }


        private void ExpandSupplierEntity(supplier entity)   //load the supplier's fruits
        {
            DbContext context = this.Repository.GetDbContext();

            // .. explicitely load the User's Permissions ..
            context.Entry(entity)
                .Collection(x => x.SupplierFruits)
                .Load();


        }

        private Boolean Lookupfruit(Int32 fruitId)      //Check if fruit exists.
        {
            fruitShopDbContext context = (fruitShopDbContext)Repository.GetDbContext();

            IQueryable<fruit> entityQuery = from fruit in context.fruits
                                            where fruit.Id.Equals(fruitId)
                                            select fruit;

            fruit f = entityQuery.FirstOrDefault();

            if (f == null)
            {
                Logger.ErrorFormat("Unable to find {0}", fruitId);
                throw new UserFriendlyException("Sorry I cannot find the fruit.");
            }
            return true;


        }


    }

}