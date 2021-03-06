var pageSession = new ReactiveDict();

Template.ContactsCustomersInsert.rendered = function() {
	
};

Template.ContactsCustomersInsert.events({
	
});

Template.ContactsCustomersInsert.helpers({
	
});

Template.ContactsCustomersInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsCustomersInsertInsertFormInfoMessage", "");
	pageSession.set("contactsCustomersInsertInsertFormErrorMessage", "");

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

Template.ContactsCustomersInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsCustomersInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsCustomersInsertInsertFormInfoMessage", "");
		pageSession.set("contactsCustomersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsCustomersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(contactsCustomersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsCustomersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.customers", {type: self.params.type});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsCustomersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.type = self.params.type;

				newId = Customers.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contacts.customers", {type: this.params.type});
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

Template.ContactsCustomersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsCustomersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsCustomersInsertInsertFormErrorMessage");
	}
	
});
