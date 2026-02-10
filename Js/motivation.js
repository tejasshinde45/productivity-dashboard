export function motivationQuotesShow() {
  let motivationQuotes = document.querySelector('.motivation-2 h1')
  let motivationAuthor = document.querySelector('.motivation-3 h2')

  const img = document.querySelector('.profile-pic img');
  img.src = "https://xsgames.co/randomusers/avatar.php?g=male";

  async function fetchQuotes() {
    const response = await fetch(
      'https://dummyjson.com/quotes/random');

    const data = await response.json();
    //   console.log(data.quote)

    motivationQuotes.innerHTML = data.quote
    motivationAuthor.innerHTML = data.author
  }
  fetchQuotes();
}
