const jsonString = '{"films":[{"id":"1","title":"The Giant Gila Monster","runtime":"108","capacity":30,"showtime":"04:00PM","tickets_sold":27,"description":"A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.","poster":"https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"},{"id":"2","title":"Manos: The Hands Of Fate","runtime":"118","capacity":50,"showtime":"06:45PM","tickets_sold":44,"description":"A family gets lost on the road and stumbles upon a hidden, underground, devil-worshiping cult led by the fearsome Master and his servant Torgo.","poster":"https://www.gstatic.com/tv/thumb/v22vodart/47781/p47781_v_v8_ac.jpg"}]}';
const filmsData = JSON.parse(jsonString);

const container = document.querySelector("#filmList");

const movie1 = filmsData.films[0];
document.write('<img src="' + movie1.poster + '"><br>');
document.write('Title: ' + movie1.title + '<br>');
document.write('Runtime: ' + movie1.runtime + ' minutes<br>');
document.write('Showtime: ' + movie1.showtime + '<br>');
document.write('Tickets sold: ' + movie1.tickets_sold + '<br><br>');

fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(data => {
        data.forEach((film) => {
          const filmListItem = document.querySelectorAll("li");
          filmListItem.innerHTML = `
            <a href="#" data-id="${film.id}">${film.title}</a>
          `;
          container.appendChild(filmListItem);
        });
      });

const details = document.querySelector("#filmDetails")

container.addEventListener("click", (event) => {
    event.preventDefault();

    const filmId = event.target.dataset.id;

    fetch(`http://localhost:3000/films/${filmId}`)
        .then(res => res.json())
        .then(film => {
        details.innerHTML = `
          <img src="${film.poster}" alt="${film.title} poster" />
          <h2>${film.title}</h2>
          <p><strong>Runtime:</strong> ${film.runtime} minutes</p>
          <p><strong>Showtime:</strong> ${film.showtime}</p>
          <p><strong>Tickets:</strong> ${film.tickets_sold} / ${film.capacity}</p>
          <p>${film.description}</p>
    `;
    container.querySelector("#filmDetails").remove();
    container.appendChild(details);
    });
});








