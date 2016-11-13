
var a = 1;
function increase() {
  var ChickenModel = document.getElementById("ChickenModel");
  ChickenModel.value = a;
  a++;
  if(a==10){
    document.getElementById('chickenKun').setAttribute('material','src','#redwhite2');
  }

  if(a==20){
    document.getElementById('chickenKun').setAttribute('material','src','#cutechicken');
  }
}

AFRAME.registerComponent('remove-in', {
  schema: { type: 'number' },

  tick: function () {
    var el = this.el;
    var counter = this.data;
    if (counter == a)
      el.parentNode.removeChild(el);
  }
});

AFRAME.registerComponent('change-on-click', {
    schema: {
      to: { type: 'int', default: 1 },
      src: { type: 'string' },
      target: { type: 'selector' }
    },
    init: function () {
      var data = this.data;
      this.el.addEventListener('click', function () {
        data.to++;
        this.setAttribute('value', data.to);
        data.target.setAttribute('material', 'src', data.src);
      });
    },

    tick: function () {
      var data = this.data;
      var clicked = data.to;

      if (clicked == 10) {
        data.target.setAttribute('material', 'src', data.src);
      }

    }

  });

AFRAME.registerComponent('update-raycaster', {
  schema: { type: 'selector' },

  init: function () {
    var raycasterEl = this.data;
    raycasterEl.components.raycaster.refreshObjects();
  }
});

/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */



AFRAME.registerComponent('set-image', {
  schema: {
    on: { type: 'string' },
    target: { type: 'selector' },
    src: { type: 'string' },
    dur: { type: 'number', default: 300 }
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('material', 'src', data.src);

      }, data.dur);
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});
