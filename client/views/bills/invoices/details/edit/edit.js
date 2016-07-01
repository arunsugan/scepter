var pageSession = new ReactiveDict();

Template.BillsInvoicesDetailsEdit.rendered = function() {
	
};

Template.BillsInvoicesDetailsEdit.events({
	
});

Template.BillsInvoicesDetailsEdit.helpers({
	
});

Template.BillsInvoicesDetailsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("billsInvoicesDetailsEditEditFormInfoMessage", "");
	pageSession.set("billsInvoicesDetailsEditEditFormErrorMessage", "");

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

Template.BillsInvoicesDetailsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_BillsInvoicesDetailsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("billsInvoicesDetailsEditEditFormInfoMessage", "");
		pageSession.set("billsInvoicesDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var billsInvoicesDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(billsInvoicesDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("billsInvoicesDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bills.invoices.details", {invoiceId: self.params.invoiceId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("billsInvoicesDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				InvoiceItems.update({ _id: t.data.invoice_item._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("bills.invoices.details", {invoiceId: this.params.invoiceId});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.BillsInvoicesDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("billsInvoicesDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("billsInvoicesDetailsEditEditFormErrorMessage");
	}
	
});