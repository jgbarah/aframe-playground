AFRAME.registerComponent('hello', {
    schema: {
        message: {type: 'string', default: 'Hello!'},
        event: {type: 'string', default: ''},
      },

    init: function () {
      var data = this.data;  // Component property values.
      var el = this.el;  // Reference to the component's entity.
      var pos_y = 1;
      if (data.event) {
        // This will log the `message` when the entity emits the `event`.
        el.addEventListener(data.event, function () {
          console.log(data.message);
          var box = document.createElement("a-box");
          box.setAttribute('color', 'red');
          box.setAttribute('position', {x: 0, y: pos_y, z: 0});
          el.appendChild(box);
          pos_y += 1;
        });
      } else {
        // `event` not specified, just log the message.
        console.log(data.message);
      };

    }
  });