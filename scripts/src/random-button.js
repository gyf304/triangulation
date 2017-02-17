/*global define*/
define(
	function()
	{
		var signals;
		var controls;
		var checkboxes;
		var random_button;
		var constraints = { };

		function init( shared )
		{
			signals = shared.signals;

			if ( shared.feature['query-selector-all'] )
			{
				controls = document.querySelectorAll( '.control-slider' );
				checkboxes = document.querySelectorAll( '.checkbox' );
				
				constraints = getConstraints( controls );
				random_button = document.getElementById( 'random-button' );

				random_button.addEventListener( 'click', buttonClicked, false );
				random_button.classList.remove( 'is-hidden' );
			}
		}

		function buttonClicked( event )
		{
			event.preventDefault();
			randomize();
		}

		function randomize()
		{
			var new_values = { };
			var constraint;
			var checkbox;

			for ( var id in constraints )
			{
				constraint = constraints[id];
				new_values[id] = getRandomInt( constraint.min, constraint.max );
			}

			for ( var i = 0, len = checkboxes.length; i < len; i++ ) {
				checkbox = checkboxes[i];
				new_values[checkbox.id] = Math.random() > 0.5;
			}

			signals['control-set'].dispatch( new_values );
		}

		function getConstraints( controls )
		{
			var result = { };
			var control;

			for ( var i = 0, len = controls.length; i < len; i++ )
			{
				control = controls[i];
				result[control.id] = { min: parseInt( control.min, 10 ), max: parseInt( control.max, 10 ) };
			}

			return result;
		}

		function getRandomInt( min, max )
		{
			return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
		}

		return { init: init };
	}
);