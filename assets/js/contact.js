function submitForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name == "") {
    return alert("Please enter your name!");
  } else if (email == "") {
    return alert("Please enter your email!");
  } else if (!email.match(emailFormat)) {
    return alert("Please enter a valid email!");
  } else if (subject == "") {
    return alert("Please enter your subject!");
  } else if (message == "") {
    return alert("Please enter your message!");
  }

  const data = {
    name,
    email,
    subject,
    message,
  };

  const yourEmail = "namikazeuzumaki43@gmail.com";

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${yourEmail}&su=${encodeURIComponent(
    data.subject
  )}&body=${encodeURIComponent(data.message)}`;

  window.open(gmailLink);

  console.log(data);
}
