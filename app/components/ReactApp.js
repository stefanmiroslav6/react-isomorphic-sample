var React = require('react/addons');

var ReactApp = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  dragStart: function(e) {
    if(!this.placeholder) {
      // This part should be replaced by creating element on server
      this.placeholder = document.createElement("li");
      this.placeholder.className = "placeholder";
    }
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(e) {

    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(this.placeholder);
    // Update data
    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    if(this.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({data: data});
  },
  dragOver: function(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target;
    // Inside the dragOver method
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;
    
    if(relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(this.placeholder, e.target.nextElementSibling);
    }
    else if(relY < height) {
      this.nodePlacement = "before"
      parent.insertBefore(this.placeholder, e.target);
    }
  },
  render: function() {
    return <ul onDragOver={this.dragOver}>
      {this.state.data.map(function(item, i) {
        return (
          <li
            data-id={i}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}
          >
            {item}
          </li>
        )
      }, this)}
    </ul>
  }
});

module.exports = ReactApp;