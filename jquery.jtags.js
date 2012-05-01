(function($) {
	$.fn.jtags = function() {
		return this.each(function () {
			// Sets focus to the input
			$(this).on('click', function() { $(this).find('li:last-child input[type=text]').focus(); });
			// Adds tags to the list
			$(this).on('keyup', 'input[type=text]', function(e) {
				// Checks if spacebar is pressed
				if (e.keyCode == 32) {
					// Checks if the value of the input is empty
					if ($(this).val() != ' ') {
						// Clones the new tag
						clone = $(this).parent().clone().addClass('tag');
						// Input text filtering
						str = clone.find('input[type=text]').val();
						str = str.replace(/^\s+|\s+$/g, '');
						str = str.toLowerCase();

						var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
						var to = "aaaaeeeeiiiioooouuuunc------";
						for (var i=0, l=from.length ; i<l ; i++)
							str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));

						str = str.replace(/[^a-z0-9 -]/g, '')
							.replace(/\s+/g, '-')
							.replace(/-+/g, '-');

						// Replaces the original text with the filtered one
						clone.find('input[type=text]').val(str);
						// Adds the text at the front of the input
						clone.prepend(str);
						// Hides the input
						clone.find('input[type=text]').hide();
						// Shows the remove button for the tag
						clone.find('.remove').show();
						// Adds the new tag before the last li
						$(this).parent().before(clone);
						// Clears the text from the last li input
						$(this).val('');
					} else { // Clear the input
						$(this).val('');
					}
				}
			});
			// Remove the tag on remove button click
			$(this).on('click', '.remove', function() {
				$(this).parent().fadeOut('fast', function() { $(this).remove(); });
			});
			// Allow sorting of the tags (stops stags from being moved after the input box)
			$(this).sortable({ items: 'li:not(:last-child)' });
		});
	}
})(jQuery);