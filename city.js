function showCountry(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/city/country",
        success: function (country){
            let content = "";
            for (let i = 0; i < country.length; i++) {
                content +=`<option value="${country[i].id}">${country[i].name}</option>`
            }
            $("#country").html(content);
            $("#country1").html(content);
        }
    })
}
showCountry()

function showAllCity(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/list",
        success: function (city){
            let content = "";
            for (let i = 0; i < city.length; i++) {
                content+=`<tr>
        <td> <a href="info.html" onclick="showInfo(${city[i].id})">${city[i].name}</a></td>
        <td>${city[i].acreage}</td>
        <td>${city[i].population}</td>
        <td>${city[i].country.name}</td>
        <td>${city[i].gdp}</td>
        <td>${city[i].description}</td>
        <td><button class="btn btn-primary" onclick="showEditForm(${city[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
        <td><button class="btn btn-primary" onclick="deleteCity(${city[i].id})">Delete</button></td>
    </tr>`
            }
            $("#list-city").html(content);
        }
    })
}
showAllCity()

function addNewCity(){
    let name = $('#name').val();
    let acreage = $('#acreage').val();
    let population = $('#population').val();
    let country = $('#country').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let newCity = {
        'name' : name,
        'acreage' : acreage,
        'population'  : population,
        'country' : {
            "id": country
        },
        'gdp' : gdp,
        'description' : description
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCity),
        url: "http://localhost:8080/city/createCity",
        success: showAllCity(),
    });
    event.preventDefault();
}

function deleteCity(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/city/delete/${id}`,
        success: showAllCity
    })
}
function showEditForm(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name1" >
                        </div>
                        <div class="mb-3">
                            <label for="acreage" class="form-label">acreage</label>
                            <input type="text" class="form-control" id="acreage1">
                        </div>
                        <div class="mb-3">
                            <label for="population1" class="form-label">population</label>
                            <input type="text" class="form-control" id="population1">
                        </div>
                        <div>
                        <label>Country:</label>
                        <select name="country1" id="country1">   
                        </select>
                        </div>
                        <div class="mb-3">
                            <label for="gdp1" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="gdp1">
                        </div>
                        <div class="mb-3">
                            <label for="description1" class="form-label">description</label>
                            <input type="text" class="form-control" id="description1">
                        </div>
                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="updateCity(${id})">Edit</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/city/findOne/${id}`,
        success:function (city){
            $('#name1').val(city.name)
            $('#acreage1').val(city.acreage)
            $('#population1').val(city.population)
            $('#country1').val(city.country)
            $('#gdp1').val(city.gdp)
            $('#description1').val(city.description)
        }
    })

    showCountry();
}

function showInfo(id){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/city/findOne/${id}`,
        success:function (city){
            $('#name2').val(city.name)
            $('#acreage2').val(city.acreage)
            $('#population2').val(city.population)
            $('#country2').val(city.country)
            $('#gdp2').val(city.gdp)
            $('#description2').val(city.description)
        }
    })
    let content= `<span id="name2"></span> la mot thanh pho <span id="description2"></span>  cua <span id="country2"></span>`
    $("#show").html(content);
    showCountry();
}

function updateCity(id){
    let name = $(`#name1`).val();
    let acreage = $(`#acreage1`).val();
    let population = $(`#population1`).val();
    let country = $(`#country1`).val();
    let gdp = $(`#gdp1`).val();
    let description = $(`#description1`).val();
    let newCity = {
        'name': name,
        'acreage': acreage,
        'population': population,
        'country': {
            "id": country
        },
        'gdp': gdp,
        'description': description
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"PUT",
        data: JSON.stringify(newCity),
        url:`http://localhost:8080/city/edit/${id}`,
        success:showAllCity()
    })
}
showCountry();