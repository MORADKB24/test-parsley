// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});
    
    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

// [START region_fillform]
function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    
    var numero_libelle_voie = '';
    var ville = '';
    var code_postal = '';
    var pays = '';
    
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        console.log(addressType);
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            if (i == 0) {
                numero_libelle_voie += val + ' ';
            }
            if (i == 1) {
                numero_libelle_voie += val;
            }
            if (i == 2) {
                ville = val;
            }
            if (i == 5) {
                pays = val;
            }
            if (i == 6) {
                code_postal = val;
            }
        }
    }

    console.log('code_postal'+code_postal);
    console.log('ville'+ville);
    console.log('pays'+pays);

    $('input[name="adresse"]').val(numero_libelle_voie.toUpperCase());
    $('input[name="city"]').val(ville.toUpperCase());
    $('input[name="cp"]').val(code_postal.toUpperCase());
    $('input[name="pays"]').val(pays);
}
// [END region_fillform]


// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
// [END region_geolocation]

$(document).ready(function () {
    
    $('#autocomplete').on('focus', function () {
        geolocate()
    });
    
    $('#autocomplete').on('keydown', function () {
        if ($('.pac-container').is(':visible') && event.keyCode == 13) {
            event.preventDefault();
        }
    });
    

    $('#autocomplete').on('keyup keypress', function () {
        $('input[name="adresse"]').val($('#autocomplete').val());
        $('input[name="city"]').val("");
        $('input[name="cp"]').val("");
        $('input[name="pays"]').val("");
    });

});
