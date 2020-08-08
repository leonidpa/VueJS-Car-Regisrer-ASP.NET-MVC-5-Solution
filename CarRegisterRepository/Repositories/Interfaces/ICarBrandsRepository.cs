using CarRegisterRepositoryLibrary.Models.CarModels.CarBrandModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRegisterRepositoryLibrary.Repositories.Interfaces
{
    public interface ICarBrandsRepository
    {
        void AddCarBrand(AddCarBrandModel model);
        List<DisplayCarBrandModel> GetCarBrands();
        void DeleteCarBrand(long carBrandId);
        void UnvisibleCarBrand(long carBrandId);
    }
}
