//Using jQuery to get more practice//
//DATA

const cupcakeList = [
    {
        id: 0,
        flavor: "Chocolate",
        filling: "Raspberry"
    },
    {
        id: 1,
        flavor: "Lemon",
        filling: "Lemon"
    },
]

$(() => {
    renderCupcakeList()
})

//container piece//
const $cupcakeContainer = $("cupcakes-container")


//function to take the data, loop it, render a card for each, and put it into the Cupcake container*//
    //will get an array of divs using .map//

function renderCupcakeList() {
    $cupcakeContainer.empty()
    $cupcakeContainer.append(cupcakeList.map(cupcake => renderCupcake(cupcake)))
}

//function to reder individual cupcakes//
function renderCupcake(cupcake) {
    return $("<div/>").addClass("card mt-4").append(
        $("<div/>").addClass("card-body").append(
            $("<h5/>").addClass("card-title").text(cupcake.flavor)
        )
    )
}

/* <div class="card mt-4" id="card">
            <div class="card-body">
                <h5 class="card-title">Chocolate with Rapsberry Filling</h5>
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </div>
        </div> */