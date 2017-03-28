/**
 * Gets a new quote from quotesondesign.com and inserts it to the
 * #quote-box element
 */
function getNewQuote() {
  $.ajaxSetup({ cache: false, crossDomain: true });

  $.getJSON(
    'http://quotesondesign.com/wp-json/posts',
    {
      'filter[orderby]': 'rand',
      'filter[posts_per_page]': 1
    }).done(function(data){

      var quoteText = $(data[0].content).text();
      var quoteAuthor = data[0].title;
      var currentUrl = $(location).attr('href');

      var tweetText = quoteText + ' ―' + quoteAuthor;
      var hashtags = 'freeCodeCamp,RandomQuoteMachine';
      var via = 'l4sh0';

      var hashTagsLength = (' #' + hashtags.replace(/,/g, ' #')).length;
      var truncatePosition = 140 - hashTagsLength - 3;


      if (tweetText.length > truncatePosition) {
        tweetText = tweetText.substr(0, truncatePosition).trim().replace(/\W$/, '') + '...';
      }


      var tweetButtonUrl = 'https://twitter.com/intent/tweet/'
      tweetButtonUrl += '?text=' + encodeURIComponent(tweetText);
      tweetButtonUrl += '&hashtags=' + hashtags;

      $('#quote-text').html(quoteText);
      $('#quote-author').html(quoteAuthor);
      $('#tweet-button').attr('href', tweetButtonUrl);

    });
}

$(function() {
  getNewQuote();
});