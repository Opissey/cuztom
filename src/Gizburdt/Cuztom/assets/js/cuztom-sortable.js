
// Add sortable
doc.on( 'click', '.js-cuztom-add-sortable', function(event) {
    var that     = $(this),
        cuztom   = that.closest('.js-cuztom'),
        box      = cuztom.data('box-id'),
        type     = that.data('sortable-type');

    // Field
    if(type == 'repeatable') {
        var field   = that.closest('.js-cuztom-field');
        var counter = field.find('.js-cuztom-counter');
    } else {
        var control = that.closest('.js-cuztom-control')
        var id      = control.data('control-for');
        var counter = control.find('.js-cuztom-counter');
        var field   = $('.js-cuztom-field[data-id="' + id + '"]');

        console.log(counter);
    }

    // Sortable
    var sortable = field.find('.js-cuztom-sortable');

    // Count(er)
    var counterCurrent = counter.find('.js-current'),
        counterMax     = counter.find('.js-max'),
        count          = sortable.find('.js-cuztom-sortable-item').length,
        index          = count;

    // Data
    var ajaxUrl  = Cuztom.ajax_url,
        ajaxData = {
            action: 'cuztom_add_' + type + '_item',
            cuztom: {
                box:     box,
                field:   that.data('field-id'),
                count:   count,
                index:   index
            }
        };

    // Call
    $.post(ajaxUrl, ajaxData, function(response) {
        var response = $.parseJSON(response);

        if(response.status) {
            sortable.append(response.item);
            counterCurrent.text(count + 1);
        } else {
            alert(response.message);
        }

        // Re-init ui
        cuztomUI(document);
    });

    // Prevent click
    event.preventDefault();
});

// Remove sortable
doc.on( 'click', '.js-cuztom-remove-sortable', function(event) {
    var that     = $(this),
        cuztom   = that.closest('.js-cuztom'),
        box      = cuztom.data('box-id'),
        item     = that.closest('.js-cuztom-sortable-item');

    // Field
    var field    = that.closest('.js-cuztom-field'),
        sortable = field.find('.js-cuztom-sortable'),
        type     = that.data('sortable-type');

    // Count(er)
    var counter        = field.find('.js-cuztom-counter'),
        counterCurrent = counter.find('.js-current'),
        counterMax     = counter.find('.js-max'),
        count          = sortable.find('.js-cuztom-sortable-item').length,
        index          = count;

    // Remove
    item.remove();
    counterCurrent.text(count - 1);

    event.preventDefault();
});
