using CarRegisterRepositoryLibrary.Models.CarModels.CarModelModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRegisterRepositoryLibrary.Repositories.Interfaces
{
    public interface ICarModelsRepository
    {
        void AddCarModel(AddCarModelModel model);
        List<DisplayCarModelModel> GetCarBrandModels(long carBrandId);
        void DeleteCarModel(long carModelId);
        void UnvisibleCarModel(long carModelId);
    }
}
