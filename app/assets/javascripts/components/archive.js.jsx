var Archive = React.createClass({
  getInitialState: function() {
    return { poems: PoemStore.all() };
  },

  componentDidMount: function() {
    PoemStore.addChangeListener(this._onChangeEvent);
    ApiUtil.fetchPoems({'status': 'complete'});
  },

  componentWillUnmount: function() {
    PoemStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function() {
    this.setState({ poems: PoemStore.all() });
  },

  _buildPoemArchive: function() {
    var that = this;
    var poemArchive = this.state.poems.map(function(poem){
      return (
        <PoemListItem status='complete' key={poem.id} {...poem}/>
      );
    });
    return poemArchive;
  },

  render: function() {
    var poems = this._buildPoemArchive();
    if (poems.length === 0) {
      return <div>No poems completed yet.</div>;
    }
    return(
      <div className='archive-container'>
        <ul className='poem-archive'>{poems}</ul>
      </div>
    );
  }
});
