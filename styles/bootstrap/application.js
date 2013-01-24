
$(document).ready( function() {
	$('body').on('hidden', '.modal', function () {
		$(this).removeData('modal');
	});

	$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });

	$('#expirationdate, #fromdate, #todate, #createstartdate, #createenddate, #expirationstartdate, #expirationenddate')
		.datepicker()
		.on('changeDate', function(ev){
			$('#expirationdate, #fromdate, #todate, #createstartdate, #createenddate, #expirationstartdate, #expirationenddate').datepicker('hide');
		});

	$(".chzn-select").chosen();
	$(".chzn-select-deselect").chosen({allow_single_deselect:true});

	$(".pwd").passStrength({
		url: "../op/op.Ajax.php",
		onChange: function(data, target) {
			pwsp = 100*data.score;
			$('#'+target+' div.bar').width(pwsp+'%');
			if(data.ok) {
				$('#'+target+' div.bar').removeClass('bar-danger');
				$('#'+target+' div.bar').addClass('bar-success');
			} else {
				$('#'+target+' div.bar').removeClass('bar-success');
				$('#'+target+' div.bar').addClass('bar-danger');
			}
		}
	});

	/* The typeahead functionality useѕ the rest api */
	$("#searchfield").typeahead({
		minLength: 3,
		source: function(query, process) {
			$.get('../restapi/index.php/search', { query: query, limit: 8, mode: 'typeahead' }, function(data) {
					process(data);
			});
		},
		updater: function (item) {
			document.location = "../op/op.Search.php?query=" + encodeURIComponent(item);
			return item;
		}
	});
});
