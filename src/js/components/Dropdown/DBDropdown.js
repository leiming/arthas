/** @jsx React.DOM */

var Test = React.createClass({
  getInitialState: function() {
    return {
      data: [
        { id: 1, selected: false },
        { id: 2, selected: false },
        { id: 3, selected: false },
        { id: 4, selected: false }
      ]
    };
  },
  render: function() {
    var checks = this.state.data.map(function(d) {
      return (
        <div>
          <input type="checkbox" checked={d.selected} onChange={this.__changeSelection.bind(this, d.id)} />
          {d.id}
          <br />
        </div>
      );
    }.bind(this));
    return (
      <form>
        <input type="checkbox" ref="globalSelector" onChange={this.__changeAllChecks} />Global selector
        <br />
        {checks}
      </form>
    );
  },
  __changeSelection: function(id) {
    var state = this.state.data.map(function(zd) {
      return {
        id: d.id,
        selected: (d.id === id ? !d.selected : d.selected)
      };
    });

    this.setState({ data: state });

  },
  __changeAllChecks: function() {
    var value = this.refs.globalSelector.getDOMNode().checked;
    var state = this.state.data.map(function(d) {
      return { id: d.id, selected: value };
    });

    this.setState({ data: state });
  }
});

React.render(<Test />, document.getElementById('content'));
