var About = React.createClass({
  render: function() {
    var githubLink = (
      <a href='http://github.com/ajaxm/MultiVerse'>
        see the Github page
      </a>
    );
    var personalLink = (
      <a href='http://www.ajaxmanohar.com/'>
        Ajax Manohar
      </a>
    );
    var wikiLink = (
      <a href='http://en.wikipedia.org/wiki/Exquisite_corpse'>
        "Exquisite Corpse"
      </a>
    );
    var homeLink = (
      <a href='/#'>
        Home
      </a>
    );
    var archiveLink = (
      <a href='/#archive'>
        Archive
      </a>
    );
    return (
      <div className='about-container'>
        <div className="lines"></div>
        <h2 className='about-header'>The MultiVerse</h2>
        <ul className='about-list'>
          <li>The MultiVerse is a collaborative poetry-writing game
            following the {wikiLink} method.</li>
          <li>The {homeLink} tab contains poems that are in progress. <br></br> Completed
            poems live in the {archiveLink} tab.</li>
          <li><span className='about-encourage'>Anyone can write poetry! </span>
            Go on, add a few lines to the 'Verse!</li>
          <li className='about-subheader'>Creating Poems:</li>
          <li>On creating a poem, you write the first stanza and specify the
            number of stanzas the poem should have. When it reaches that length,
            it is closed for contribution and added to the Archive.</li>
          <li className='about-subheader'>Contributing Stanzas:</li>
          <li>Before a poem is completed, only its most recent line is visible.
            The next stanza is written based on this line.</li>
          <li>Stanzas must be at least two lines long,
            and no more than three.</li>
          <li className='about-subheader'>About:</li>
          <li>The MultiVerse was created by {personalLink} using
            React.js and Rails. For more information, {githubLink}.</li>
        </ul>
      </div>
    );
  }
});
