const socket =io();
socket.on('number', (msg) => {
    console.log('Random number:', msg);
    document.getElementById('number').innerText = msg;
    });

async function submitFunction() {
    const name = document.getElementById("Name").value;
    const hotel = document.querySelector('input[name="hotel"]:checked')?.value;
    const response = prompt("Enter your response about the hotel:");
 

    if (!name || !hotel || !response) {
        alert("Please fill all the fields and provide a response!");
        return;
    }

    const bookingData = { name, hotel, response };

    try {
        const res = await fetch('http://localhost:3000/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        const data = await res.json();
        if (res.ok) {
            alert("Booking and response saved successfully!");
            document.getElementById("hotelForm").reset(); 
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error saving booking:", error);
        alert("Failed to save booking.");
    }
}

async function fetchHotels() {
    try {
        const hotels = ["Hotel A", "Hotel B", "Hotel C"];
        const hotelOptions = document.getElementById("hotelOptions");
        hotelOptions.innerHTML = hotels.map(hotel => `
            <label>
                <input type="radio" name="hotel" value="${hotel}" />
                <span>${hotel}</span>
            </label><br>
        `).join('');
    } catch (error) {
        console.error("Error fetching hotels:", error);
    }
}


document.addEventListener("DOMContentLoaded", fetchHotels);
