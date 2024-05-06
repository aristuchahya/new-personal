function getTestimonial(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };

    xhr.onerror = () => {
      reject("Network Error");
    };

    xhr.send();
  });
}

async function allTestimonial() {
  const testimonials = await getTestimonial(
    "https://api.npoint.io/4d457f8164ebde466928"
  );

  if (!testimonials.length) {
    return (document.getElementById("testi").innerHTML =
      "<h1>Data Not Found</h1>");
  }

  const testimonialHTML = testimonials.map((testimonial) => {
    return `
          <div class="card shadow" style="width: 350px">
            <img
              src="${testimonial.image}"
              class="card-img-top p-3"
              alt="..."
              style="border-radius: 25px"
            />
            <div class="card-body">
              <p class="card-text fw-normal"><i>"${testimonial.quote}"</i></p>
              <p class="card-text fw-semibold text-end">
                - ${testimonial.author}
              </p>
              <p class="card-text text-end">${testimonial.rating}<i class="fa-regular fa-star text-warning"></i></p>
            </div>
          </div>
        `;
  });

  console.log(testimonials);

  document.getElementById("testi").innerHTML = testimonialHTML.join("");
}

async function filterTestimonial(rating) {
  const testimonials = await getTestimonial(
    "https://api.npoint.io/4d457f8164ebde466928"
  );

  const filteredTesti = testimonials.filter(
    (testimonial) => testimonial.rating == rating
  );

  if (!filteredTesti.length) {
    return (document.getElementById("testi").innerHTML =
      "<h1>Data Not Found</h1>");
  }

  const testimonialHTML = filteredTesti.map((testimonial) => {
    return `<div class="card shadow" style="width: 350px">
            <img
              src="${testimonial.image}"
              class="card-img-top p-3"
              alt="..."
              style="border-radius: 25px"
            />
            <div class="card-body">
              <p class="card-text fw-normal"><i>"${testimonial.quote}"</i></p>
              <p class="card-text fw-semibold text-end">
                - ${testimonial.author}
              </p>
              
            </div>
          </div>`;
  });

  document.getElementById("testi").innerHTML = testimonialHTML.join("");
}

allTestimonial();
