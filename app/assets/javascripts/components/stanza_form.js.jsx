var StanzaForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return { body: '' };
  },

  componentDidMount: function() {
    PoemStore.addStanzaListener(this._onCreation);
  },

  componentWillUnmount: function() {
    PoemStore.removeStanzaListener(this._onCreation);
  },

  _onCreation: function() {
    this.setState({ body: '' });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var newStanza = $.extend({}, this.state, { poem_id: this.props.poemId });
    ApiUtil.createStanza(newStanza);
  },

  render: function() {
    var form = (
      <form className='stanza-form' onSubmit={this.handleSubmit}>
        <textarea className='stanza-input' valueLink={this.linkState('body')}
                  disabled={this.props.isDisabled}
                  placeholder={this.props.placeholder}/>
        <input className='stanza-submit' type="submit"
               disabled={this.props.isDisabled}
               value="Add Stanza!"/>
      </form>
    );

    return (<div className='stanza-form-container'>{form}</div>);
  }
});
