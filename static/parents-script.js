$(document).ready(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let kidId = urlParams.get('id');
    getParents(kidId);
    function getParents(kidId){
        if (kidId) {
            $.getJSON(`http://localhost:8080/kid/${kidId}`, function(kid) {
                $(".request-error").hide()
                loadParents(kid.mother, "#mother-select", 2);
                loadParents(kid.father, "#father-select", 1);
            });
        }
        else{
            loadParents(null, "#mother-select", 2);
            loadParents(null, "#father-select", 1);
            $("#save-parents").hide();
        }
    }
   

    function loadParents(selectedId, selector, sex) {
        $(".request-error").hide()
        $.getJSON(`http://localhost:8080/parent`, function(parents) {
            let filteredParents = parents.filter(p => p.sex === sex);
            let select = $(selector);
            select.append('<option value="">Оберіть</option>');
            
            filteredParents.forEach(parent => {
                select.append(`<option value="${parent.id}" ${parent.id == selectedId ? 'selected' : ''}>${parent.name}</option>`);
            });
        }
    ).fail(()=>{
            $(".request-error").show();
    })
    ;
    }

    $("#save-parents").click(function() {
        let updatedData = {
            mother: $("#mother-select").val() || null,
            father: $("#father-select").val() || null
        };

        $.ajax({
            url: `http://localhost:8080/kid/update/parent/${kidId}`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(updatedData),
            success: function() {
                alert("Дані оновлено");
            }
        });
    });

    $("#add-mother, #add-father").click(function() {
        let sex = $(this).attr("id") === "add-mother" ? 2 : 1;
        $("#parent-form").fadeIn();
        $("#save-parent").off("click").on("click", function() {
            let newParent = {
                name: $("#parent-name").val(),
                phone: $("#parent-phone").val(),
                homeAddress: $("#parent-address").val(),
                sex: sex
            };

            $.ajax({
                url: "http://localhost:8080/parent/save",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(newParent),
                success: function(response) {
                    alert("Батька додано!");
                    getParents(kidId);
                    $("#parent-form").fadeOut();
                }
            });
        });
    });
    $("#view-mother, #view-father").click(function() {
        let parent = $(this).data("parent");
        if (parent=="mother") {
            parentId = $("#mother-select").val();
        } else {
            parentId = $("#father-select").val();
        }
        if(!parentId){
            alert(`Оберіть ${parent=="mother" ? "мати" : "батька" }`);
            return;
        }

        $.getJSON(`http://localhost:8080/parent/${parentId}`, function(parent) {
            $("#edit-parent-name").val(parent.name);
            $("#edit-parent-phone").val(parent.phone);
            $("#edit-parent-address").val(parent.homeAddress);
            $("#edit-parent-form").fadeIn();
            
            $("#update-parent").off("click").on("click", function() {
                let updatedParent = {
                    name: $("#edit-parent-name").val(),
                    phone: $("#edit-parent-phone").val(),
                    homeAddress: $("#edit-parent-address").val()
                };
                
                $.ajax({
                    url: `http://localhost:8080/parent/update/${parentId}`,
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(updatedParent),
                    success: function() {
                        alert("Дані оновлено");
                        getParents(kidId);
                        $("#edit-parent-form").fadeOut();
                    }
                });
            });
        });
    });
});