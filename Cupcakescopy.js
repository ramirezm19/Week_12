//Using jQuery to get more practice//
//DATA

const cupcakeList = [
    {
        id: 0,
        flavor: "Chocolate",
        filling: "Raspberry",
        frosting: "Buttercream",
        cupcakeEdit: false
    },
    {
        id: 1,
        flavor: "Lemon",
        filling: "Lemon",
        frosting: "Whipped Cream",
        cupcakeEdit: false
    },
]

//RENDERING
$(() => {
    renderCupcakeList()
})

//container piece//
const $cupcakeContainer = $("#cupcakes-container")


//function to take the data, loop it, render a card for each, and put it into the Cupcake container*//
    //will get an array of divs using .map//

function renderCupcakeList() {
    $cupcakeContainer.empty()
    $cupcakeContainer.append(cupcakeList.map(cupcake => renderCupcake(cupcake)))
}

//function to reder individual cupcakes with edit and delete buttons//
function renderCupcake(cupcake) {
    return $("<div/>").addClass("card mt-4").append(
        $("<div/>").addClass("card-body").attr('id', `cupcake-${cupcake.id}`).append(
            $("<h5/>").addClass("card-title").text('Cupcake: ' + cupcake.flavor + ' with ' + cupcake.filling + ' filling & ' + cupcake.frosting + ' frosting.'),
            $("<button/>").addClass("btn btn-primary me-5").text("Edit").on("click", () => onEdit(cupcake.id)),
            
            //using jQuery to get the event listener-$button.on("click", function). In vanilla JS it would be theButton.addEventListener("click", function).
            $("<button/>").addClass("btn btn-danger me-5").text("Delete").on("click", () => onDeleteClick(cupcake.id)),
        )
    )
}

//EVENT LISTENERS

const cupcakeModal = new bootstrap.Modal("#new-cupcake-modal")
const $cupcakeModalTitle = $("cupcake-modal-title")
const $flavorInput = $("#flavor-input")
const $fillingInput = $("#filling-input")
const $frostingInput = $("#frosting-input")
const $cupcakeEditInput = $("#cupcakeEdit-input")
console.log($cupcakeEditInput)
let editCupcakeId = null; 

function onNewCupcakeClick() {
    //opening the modal
    cupcakeModal.show();

    //clearing the form. Usually would do $nameInput.text = " "; but using a method.
    $flavorInput.val("");
    $fillingInput.val("");
    $frostingInput.val("");
    $cupcakeEditInput.val("");

    //identifying that creating a cupcake
    editCupcakeId = null; 
    
}

function onEdit(cupcakeId){
    //selecting the right cupcake to edit
    const cupcake = cupcakeList.findIndex(cupcake => cupcake.id === cupcakeId);
    //opening the modal
    cupcakeModal.show();
    //change title of the modal
    $cupcakeModalTitle.text("Edit Cupcake") //<------should be changing the title of the Edit modal

    //put current cupcake data in form
    $flavorInput.val(cupcake.flavor);
    $fillingInput.val(cupcake.filling);
    $frostingInput.val(cupcake.frosting);
    $cupcakeEditInput.val(cupcake.cupcakeEdit);

    //identifying that editing a cupcake
    editCupcakeId = cupcake.id;
}



function onSaveCreate() {

    // const cupcakeElement = document.getElementById(`cupcake-${cupcake.id}`)
    // console.log('onSaveCreate', cupcakeElement);

    //check to see if saving a newly created cupcake vs. updating a cupcake
    if(editCupcakeId === null) {
        //get the input from the modal and create new cupcake and add it to list
        cupcakeList.push({
            id: cupcakeList[cupcakeList.length -1].id + 1,
            flavor: $flavorInput.val(),
            filling: $fillingInput.val(),
            frosting: $frostingInput.val()
        })
    } else {
        //find cupcake
        const cupcake = cupcakeList.findIndex(cupcake => cupcake.id === editCupcakeId);
        console.log('onSaveCreate inside create statement', cupcakeList);
        cupcake.innerHTML = "<div>text</div>"
        //update with new info
        cupcake.flavor = $flavorInput.val();
        cupcake.filling = $fillingInput.val();
        cupcake.frosting = $frostingInput.val();
    }
    
    //rereder list
    renderCupcakeList();
    
    //close the modal
    cupcakeModal.hide();
}

function onDeleteClick (cupcakeId) {
    const indexToDelete = cupcakeList.findIndex(cupcake => cupcake.id === cupcakeId)
    cupcakeList.splice(indexToDelete, 1);
    renderCupcakeList();
}

