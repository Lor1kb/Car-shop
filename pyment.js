var paymentForm = document.getElementById("payment-form");
var payButton = document.getElementById("pay-button");

paymentForm.addEventListener("submit", function(event){
    event.preventDefault();
    
    var name = document.getElementById("name").value;
    var cvc = document.getElementById("cvc").value;
    
    if(name.trim() === ""|| cvc.trim() === "" ){
        alert("Please fill all required fields.");
        return;
    } 

    //Validate 

    if(!cvc.match(/^\d{3,4}$/)){
        alert("Please enter a valid cvc.");
        return;
    }

    document.getElementById("success-message").style.display ="block";

    paymentForm.style.filter = "blur(4px)";
    paymentForm.reset();
    
});