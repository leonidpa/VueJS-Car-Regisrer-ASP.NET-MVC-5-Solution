var app = new Vue({
    el: '#app',
    data: {
        BrandsList: [],
        ModelsList: [],
        selectedBrandId: null,
        selectedModelId: null,
        inputBrand: '',
        inputModel: '',
        brandDeleteVisble: false,
        modelDeleteVisible: false,
        inputModelDisabled: true
    },
    methods: {
        addBrand: function () {
            if (this.inputBrand == '') return;
            var selectedBrand = this.GetSelectedBrandName();
            if (this.inputBrand == selectedBrand) return;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/brands/add/' + this.inputBrand);
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    app.GetAllBrands();
                }
            };
        },

        deleteBrand: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/api/brands/delete/' + this.GetSelectedBrandId());
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    app.GetAllBrands();
                    app.inputModelDisabled = true;
                    app.inputModel = '';
                }
            };
        },

        addModel: function () {
            if (this.inputModel == '') return;
            var selectedModel = this.GetSelectedModelName();
            if (this.inputModel == selectedModel) return;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/models/add/' + this.selectedBrandId + '/' + this.inputModel);
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    app.GetAllModels();
                }
            };
        },

        deleteModel: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/api/models/delete/' + this.GetSelectedModelId());
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    app.GetAllModels();
                }
            };
        },

        selectBrandChanged: function () {
            this.brandDeleteVisble = true;
            this.modelDeleteVisible = false;
            this.inputBrand = this.GetSelectedBrandName();
            this.GetAllModels();
        },

        setBrandSelect: function () {
            if (this.inputBrand == '') return;
            var found = this.BrandsList.find(element => element.Name.startsWith(this.inputBrand));
            this.brandDeleteVisble = false;
            if (found != undefined) {
                this.brandDeleteVisble = true;
                var sl = document.getElementById("brandsSelectList");
                sl.value = found.Id;
                this.selectedBrandId = found.Id;
                this.GetAllModels();
            }
        },

        selectModelChanged: function () {
            var selectedModelName = this.GetSelectedModelName();
            if (selectedModelName != '')
                this.modelDeleteVisible = true;
            this.inputModel = selectedModelName;
        },

        setModelSelect: function () {
            if (this.inputModel == '') return;
            var found = this.ModelsList.find(element => element.Name.startsWith(this.inputModel));
            this.modelDeleteVisible = false;
            if (found != undefined) {
                this.modelDeleteVisible = true;
                var sl = document.getElementById("modelsSelectList");
                sl.value = found.Id;
            }
        },

        GetAllBrands: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/brands');
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    if (app.BrandsList.length > 0) {
                        app.BrandsList.splice(0, app.BrandsList.length);
                    };
                    var response = JSON.parse(xhr.response);
                    response.forEach(element => app.BrandsList.push(element));
                }
            };
        },

        GetAllModels: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/models/' + (this.selectedBrandId == null ? '0' : this.selectedBrandId));
            xhr.send();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    if (app.ModelsList.length > 0) {
                        app.ModelsList.splice(0, app.ModelsList.length);
                    };
                    var response = JSON.parse(xhr.response);
                    response.forEach(element => app.ModelsList.push(element));
                    if (app.ModelsList != null) {
                        app.inputModelDisabled = false;
                    } else {
                        app.inputModelDisabled = true;
                    }
                }
            };
        },

        GetSelectedBrandName: function () {
            var sl = document.getElementById("brandsSelectList");
            if (sl.selectedIndex > -1) {
                return sl.options[sl.selectedIndex].text;
            }
            return '';
        },

        GetSelectedBrandId: function () {
            var sl = document.getElementById("brandsSelectList");
            return sl.value;
        },

        GetSelectedModelName: function () {
            var sl = document.getElementById("modelsSelectList");
            if (sl.selectedIndex > -1) {
                return sl.options[sl.selectedIndex].text;
            }
            return '';
        },

        GetSelectedModelId: function () {
            var sl = document.getElementById("modelsSelectList");
            return sl.value;
        }
    },
    mounted: function () {
        this.GetAllBrands();
    }
});
