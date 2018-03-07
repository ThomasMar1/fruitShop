using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace fruitShop.Domain
{
    [Table("dSupplierFruit")]
    public class SupplierFruit : AuditedEntity<Int32>
    {



        public SupplierFruit(supplier s) {
            if (s == null)
            {
                throw new ArgumentNullException("s");
            }
            this.supplier = s;
            this.supplierId = s.Id;
        }

        public SupplierFruit(){

        }

        #region Associations

        [ForeignKey("supplierId")]
        public supplier supplier { get; protected set; }
        public Int32 supplierId { get; protected set; }

        [ForeignKey("fruitId")]
        public fruit fruit { get; protected set; }
        public int fruitId { get; set; }



        #endregion

        #region Properties

        [Required()]
        public decimal Price { get; set; }



        #endregion

    }
}


