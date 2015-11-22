r(function(){
    // Define a exists() function
    jQuery.fn.exists = function(){return this.length > 0};

    // Using js AND operator (&&) as a simple if conditional
    $("#firstList").exists && console.log("lal");

    // Choose the list tags within #firstList
    $("li", "#firstList").css("color", "red");

    // Create a new ul element
    var ul = $("<ul>", {
        "class": "list",
        "id": "thirdList",
        "css": {
            "color": "#F2F0F0",
            "background-color": "#333",
            "padding-top": "20px",
            "padding-bottom": "20px"
        }
    });
    // Add said element to DOM
    ul.appendTo("body");
    $("#thirdList").html("<li>Carrot</li><li>Bacon</li><li>Potato</li>")

    // Make external links green
});

// starting function (most likely not necessary)
function r(f){/in/.test(document.readyState)?setTimeout("r(" + f + ")",3):f()}
