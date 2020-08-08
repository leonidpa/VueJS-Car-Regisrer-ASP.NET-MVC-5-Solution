using CarRegisterRepositoryLibrary.Models.CarModels;
using CarRegisterRepositoryLibrary.Models.CarModels.CarBrandModels;
using CarRegisterRepositoryLibrary.Models.CarModels.CarModelModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRegisterRepositoryLibrary.Repositories.Interfaces
{
    public interface ICarsRepository
    {
        IdbCarModel AddCar(AddCarModel model);
        DisplayCarModel GetCar(long carId);
        List<DisplayCarModel> GetCars();
        bool UpdateCar(UpdateCarModel model);
        void DeleteCar(long carId);
    }
}
