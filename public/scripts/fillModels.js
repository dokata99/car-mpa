const dropdown = document.getElementById("brand");

if (dropdown != null) {
    dropdown.addEventListener("change", function() {
        let selectedBrand = dropdown.options[dropdown.selectedIndex].text;

        fetch('/add/' + selectedBrand)
            .then(res => {
                return res.text()
            })
            .then(data => {
                let models = JSON.parse(data);

                let modelsOptions = document.getElementById("model")
                modelsOptions.innerHTML = ""
                models.forEach(function(model) {
                    let option = document.createElement("option")
                    option.value = model.model
                    option.innerHTML = model.model
                    modelsOptions.appendChild(option)
                })

            })
            .catch(error => console.log(error))
    })
}