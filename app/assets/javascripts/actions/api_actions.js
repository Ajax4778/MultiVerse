var ApiActions = {
  receiveAllPoems: function(poems) {
    var action = {
      actionType: PoemConstants.POEMS_RECEIVED,
      poems: poems
    };
    AppDispatcher.dispatch(action);
  },

  receiveOnePoem: function(poem) {
    var action = {
      actionType: PoemConstants.ONE_POEM_RECEIVED,
      poem: poem
    };
    AppDispatcher.dispatch(action);
  },

  createPoem: function(poem) {
    var action = {
      actionType: PoemConstants.POEM_CREATED,
      poem: poem
    };
    AppDispatcher.dispatch(action);
  },

  createStanza: function(associatedPoem) {
    var action = {
      actionType: PoemConstants.STANZA_CREATED,
      poem: associatedPoem
    };
    AppDispatcher.dispatch(action);
  }
};
