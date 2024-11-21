document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Collect input values
    const featuresArray = [
        parseFloat(document.getElementById('fixed_acidity').value),
        parseFloat(document.getElementById('volatile_acidity').value),
        parseFloat(document.getElementById('citric_acid').value),
        parseFloat(document.getElementById('residual_sugar').value),
        parseFloat(document.getElementById('chlorides').value),
        parseFloat(document.getElementById('free_sulfur_dioxide').value),
        parseFloat(document.getElementById('total_sulfur_dioxide').value),
        parseFloat(document.getElementById('density').value),
        parseFloat(document.getElementById('pH').value),
        parseFloat(document.getElementById('sulphates').value),
        parseFloat(document.getElementById('alcohol').value)
    ];

    // Ensure all fields are filled correctly
    if (featuresArray.some(isNaN)) {
        alert("Please fill out all fields with valid numbers.");
        return;
    }

    const data = { features: featuresArray };

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.prediction !== undefined) {
            document.getElementById('predictionResult').innerText = data.prediction;
        } else {
            document.getElementById('predictionResult').innerText = 'Error: ' + data.error;
        }
    })
    .catch(error => {
        document.getElementById('predictionResult').innerText = 'Error: ' + error.message;
    });
});
