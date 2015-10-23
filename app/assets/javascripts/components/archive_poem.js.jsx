var ArchivePoem = React.createClass({
  getInitialState: function() {
    return { favoriting: true, activeId: -1 };
  },

  componentDidMount: function() {
    PoemStore.addFavListener(this._onFavEvent);
  },

  componentWillUnmount: function() {
    PoemStore.removeFavListener(this._onFavEvent);
  },

  _onFavEvent: function() {
    this.setState({ poem: PoemStore.one(), favoriting: false });
  },

  _setActive: function(id) {
    if (this.state.activeId === id) {
      this.setState({ activeId: -1 });
    } else {
      this.setState({ activeId: id });
    }
  },

  _buildPoem: function() {
    return (
      this.props.poem.stanzas.map(function(stanza){
        var isActive = false;
        if (this.state.activeId === stanza.id) {
          isActive = true;
        }
        return (
          <Stanza active={isActive}
                  setActive={this._setActive}
                  key={stanza.id} {...stanza}/>
        );
      }.bind(this))
    );
  },

  handleFavorite: function() {
    if (this.props.poem.favorited) {
      var favId = this.props.poem.fav_object.id;
      ApiUtil.removeFavorite(favId);
    } else {
      ApiUtil.addFavorite({
        'poem_id': this.props.poem.id
      });
    }
    this.setState({ favoriting: true });
  },

  render: function() {
    var poem = this.props.poem;
    var stanzas = this._buildPoem();
    var favs = '';
    if (poem.favoritors.length > 0) {
      favs = (
        <div className='poem-favoritors'>
          Favorited by {poem.favoritors.join(', ')}.
        </div>
      );
    }
    return (
      <div className='poem'>
        <div className='poem-title'>{poem.title}</div>
        <div className='poem-author'>
          created by {poem.author} {poem.timestamp} ago
        </div>
        <ul onClick={this.handleStanzaClick}>
          {stanzas}
        </ul>
        <button
          className='favorite-button'
          onClick={this.handleFavorite}
          disabled={this.state.favoriting}>
          {poem.favorited ? 'Unfavorite' : 'Favorite!'}
        </button>
        {favs}
        <a className='back-button' href='/#archive'>Back to archive.</a>
      </div>
    );
  }
});
