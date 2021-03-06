var pageSession = new ReactiveDict();

Template.BillsInvoicesDetails.rendered = function() {
	
};

Template.BillsInvoicesDetails.events({
	
});

Template.BillsInvoicesDetails.helpers({
	
});

Template.BillsInvoicesDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsInvoicesDetailsDetailsFormInfoMessage", "");
	pageSession.set("billsInvoicesDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

//	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.BillsInvoicesDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsInvoicesDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsInvoicesDetailsDetailsFormInfoMessage", "");
		pageSession.set("billsInvoicesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsInvoicesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(billsInvoicesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsInvoicesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsInvoicesDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("bills.invoices", {});
	}

	
});

Template.BillsInvoicesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsInvoicesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsInvoicesDetailsDetailsFormErrorMessage");
	}
	
});
