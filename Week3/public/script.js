function submitFunction() {
    let consumername = document.getElementById('Name').value;
    let hotel = 'no hotel';  

    let hotelOptions = document.getElementsByName('hotel');
    for (let i = 0; i < hotelOptions.length; i++) {
        if (hotelOptions[i].checked) {
            hotel = hotelOptions[i].value;
            break; 
        }
    }
    console.log(`The data added was{${consumername},${hotel}}`);
    alert(`Hey ${consumername}, you have chosen ${hotel}.`);
}