// main.js

$(document).ready(function() {
    // Handle registration form submission using jQuery AJAX
    $('#registration-form').submit(function(event) {
        event.preventDefault();

        // Serialize form data
        var formData = $(this).serialize();

        // Make AJAX request to the server for registration
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/submit',
            data: formData,
            success: function(response) {
                if (response.success) {
                    alert("Registration Successful!!");
                    window.location.href = '/public/index.html';
                } else {
                    alert("Registration Failed.");
                }
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });

    // Handle certification form submission using jQuery AJAX
    $('#certificate-form').submit(function(event) {
        event.preventDefault();

        // Serialize form data
        var formData = $(this).serialize();

        // Make AJAX request to the server for certification
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/login',
            data: formData,
            statusCode: {
                200: function(response) {
                    // Handle success (HTTP status code 200)
                    if (response.success) {
                        window.location.href = '/public/cert.html';
                    } else {
                        alert("Invalid registration!!");
                    }
                },
                401: function(response) {
                    // Handle unauthorized (HTTP status code 401)
                    alert("Invalid registration!!");
                },
                500: function(response) {
                    // Handle internal server error (HTTP status code 500)
                    console.error('Error:', response);
                    alert("Internal Server Error");
                }
            }
            
        });        
    });
});
