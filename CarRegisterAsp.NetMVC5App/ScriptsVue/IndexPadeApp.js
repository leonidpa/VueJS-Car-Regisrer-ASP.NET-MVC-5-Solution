var app = new Vue({
    el: '#app',
    data: {
        firstNameInput: '',
        lastNameInput: '',
        patronymicInput: '',
        phoneNumberInput: '',
        carNumberInput: '',
        carBrandSelect: '',
        carBrandsList: [],
        carModelSelect: '',
        carModelsList: [],
        carsList: [],
        inputCarModelDisabled: false,
        EditCarId: 0,
        plug: ''
    },
    methods: {
        OnCarBrandSelectChange: function (carBrandId) {
            this.GetAllModels(carBrandId);
        },

        RegisterCar: function () {
            if (
                this.firstNameInput == ''
                ||
                this.lastNameInput == ''
                ||
                this.patronymicInput == ''
                ||
                this.phoneNumberInput == ''
                ||
                this.carNumberInput == ''
                ||
                this.carBrandSelect == ''
                ||
                this.carModelSelect == ''
                ||
                this.firstNameInput == undefined
                ||
                this.lastNameInput == undefined
                ||
                this.patronymicInput == undefined
                ||
                this.phoneNumberInput == undefined
                ||
                this.carNumberInput == undefined
                ||
                this.carBrandSelect == undefined
                ||
                this.carModelSelect == undefined
                ||
                this.carBrandSelect == null
                ||
                this.carModelSelect == null
            ) {
                alert('Not all data is entered');
                return;
            }
            var carModel = {
                FirstName: this.firstNameInput,
                LastName: this.lastNameInput,
                Patronymic: this.patronymicInput,
                PhoneNamber: this.phoneNumberInput,
                CarNumber: this.carNumberInput,
                CarBrandId: this.carBrandSelect,
                CarModelId: this.carModelSelect
            };

            let xhr = new XMLHttpRequest();
            xhr.open('PUT', '/api/cars/add');
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(JSON.stringify(carModel));
            xhr.onload = function () {
                if (xhr.status == 200) {
                    app.GetAllCars();
                }
            };

            this.firstNameInput = '';
            this.lastNameInput = '';
            this.patronymicInput = '';
            this.phoneNumberInput = '';
            this.carNumberInput = '';
            this.carBrandSelect = '';
            this.carModelSelect = '';
        },

        OnEditCarInit: function (carId) {
            this.inputCarModelDisabled = true;
            this.EditCarId = carId;

            var brandSelect = document.getElementById("carBrandEditSelect-" + carId);
            brandSelect.innerHTML = '';
            brandSelect.addEventListener("change", function () {
                var carBrandId = document.getElementById("carBrandEditSelect-" + carId).value;
                var selectModel = function () {
                    var modelSelect = document.getElementById("carModelEditSelect-" + carId);
                    modelSelect.innerHTML = '';
                    var length = modelSelect.options.length;
                    for (i = length - 1; i >= 0; i--) {
                        modelSelect.options[i] = null;
                    }
                    if (app.carModelsList.length > 0) {
                        app.carModelsList.forEach(function (entry) {
                            var opt = document.createElement('option');
                            opt.value = entry.Id;
                            opt.innerHTML = entry.Name;
                            modelSelect.appendChild(opt);
                        }
                        );
                    }
                };
                app.GetAllModels(carBrandId, selectModel);
            });
            this.carBrandsList.forEach(function (entry) {
                var opt = document.createElement('option');
                opt.value = entry.Id;
                opt.innerHTML = entry.Name;
                brandSelect.appendChild(opt);
            }
            );
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/cars/car/' + carId);
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.response);
                    var foundBrand = app.carBrandsList.find(element => element.Name.startsWith(response.Brand));
                    if (foundBrand != undefined) {
                        var selectModel = function () {
                            var modelSelect = document.getElementById("carModelEditSelect-" + carId);
                            modelSelect.innerHTML = '';
                            app.carModelsList.forEach(function (entry) {
                                var opt = document.createElement('option');
                                opt.value = entry.Id;
                                opt.innerHTML = entry.Name;
                                modelSelect.appendChild(opt);
                            }
                            );
                            var foundModel = app.carModelsList.find(element => element.Name.startsWith(response.Model));
                            if (foundModel != undefined) {
                                var sl = document.getElementById("carModelEditSelect-" + carId);
                                sl.value = foundModel.Id;
                            }
                        }
                        app.GetAllModels(foundBrand.Id, selectModel);

                        var sl = document.getElementById("carBrandEditSelect-" + carId);
                        sl.value = foundBrand.Id;
                    }
                    document.getElementById("carBrandEditFirstNameInput-" + carId).value = response.FirstName;
                    document.getElementById("carBrandEditLastNameInput-" + carId).value = response.LastName;
                    document.getElementById("carBrandEditPatronimicInput-" + carId).value = response.Patronymic;
                    document.getElementById("carBrandEditPhoneNumberInput-" + carId).value = response.PhoneNumber;
                    document.getElementById("carBrandEditCarNumberInput-" + carId).value = response.Number;
                }
            };
        },

        OnSaveCarEdit: function (carId) {
            this.inputCarModelDisabled = false;
            this.EditCarId = 0;

            if (
                document.getElementById("carBrandEditFirstNameInput-" + carId).value == ''
                ||
                document.getElementById("carBrandEditLastNameInput-" + carId).value == ''
                ||
                document.getElementById("carBrandEditPatronimicInput-" + carId).value == ''
                ||
                document.getElementById("carBrandEditPhoneNumberInput-" + carId).value == ''
                ||
                document.getElementById("carBrandEditCarNumberInput-" + carId).value == ''
                ||
                document.getElementById("carBrandEditSelect-" + carId).value == ''
                ||
                document.getElementById("carModelEditSelect-" + carId).value == ''
                ||
                document.getElementById("carBrandEditFirstNameInput-" + carId).value == undefined
                ||
                document.getElementById("carBrandEditLastNameInput-" + carId).value == undefined
                ||
                document.getElementById("carBrandEditPatronimicInput-" + carId).value == undefined
                ||
                document.getElementById("carBrandEditPhoneNumberInput-" + carId).value == undefined
                ||
                document.getElementById("carBrandEditCarNumberInput-" + carId).value == undefined
                ||
                document.getElementById("carBrandEditSelect-" + carId).value == undefined
                ||
                document.getElementById("carModelEditSelect-" + carId).value == undefined
            ) {
                alert('Not all data is entered');
                return;
            }
            var carModel = {
                CarId: carId,
                FirstName: document.getElementById("carBrandEditFirstNameInput-" + carId).value,
                LastName: document.getElementById("carBrandEditLastNameInput-" + carId).value,
                Patronymic: document.getElementById("carBrandEditPatronimicInput-" + carId).value,
                PhoneNamber: document.getElementById("carBrandEditPhoneNumberInput-" + carId).value,
                CarNumber: document.getElementById("carBrandEditCarNumberInput-" + carId).value,
                CarBrandId: document.getElementById("carBrandEditSelect-" + carId).value,
                CarModelId: document.getElementById("carModelEditSelect-" + carId).value
            };

            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/cars/update');
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(JSON.stringify(carModel));
            xhr.onload = function () {
                if (xhr.status == 200) {
                    app.GetAllCars();
                }
            };
        },

        OnDeleteCar: function (carId) {
            var conf = confirm("Сonfirm to delete the entry");
            if (conf) {
                let xhr = new XMLHttpRequest();
                xhr.open('DELETE', '/api/cars/delete/' + carId);
                xhr.send();
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        app.GetAllCars();
                    }
                };
            }
        },

        GetAllBrands: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/brands');
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    if (app.carBrandsList.length > 0) {
                        app.carBrandsList.splice(0, app.carBrandsList.length);
                    };
                    var response = JSON.parse(xhr.response);
                    response.forEach(element => app.carBrandsList.push(element));
                }
            };
        },

        GetAllModels: function (carBrandId, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/models/' + (carBrandId == null ? '0' : carBrandId));
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    if (app.carModelsList.length > 0) {
                        app.carModelsList.splice(0, app.carModelsList.length);
                    };
                    var response = JSON.parse(xhr.response);
                    response.forEach(element => app.carModelsList.push(element));
                    if (callback != undefined && callback != null) {
                        callback();
                    }
                }
            };
        },

        GetAllCars: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/cars');
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    if (app.carsList.length > 0) {
                        app.carsList.splice(0, app.carsList.length);
                    };
                    var response = JSON.parse(xhr.response);
                    response.forEach(element => app.carsList.push(element));
                }
            };
        }
    },
    mounted: function () {
        this.GetAllBrands();
        this.GetAllCars();
    }
});
