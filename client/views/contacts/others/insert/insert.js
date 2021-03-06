var pageSession = new ReactiveDict();

Template.ContactsOthersInsert.rendered = function() {
	
};

Template.ContactsOthersInsert.events({
	
});

Template.ContactsOthersInsert.helpers({
	
});

Template.ContactsOthersInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("contactsOthersInsertInsertFormInfoMessage", "");
	pageSession.set("contactsOthersInsertInsertFormErrorMessage", "");

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

Template.ContactsOthersInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ContactsOthersInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactsOthersInsertInsertFormInfoMessage", "");
		pageSession.set("contactsOthersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactsOthersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(contactsOthersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactsOthersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contacts.others", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactsOthersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Others.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contacts.others", {});
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

Template.ContactsOthersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactsOthersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactsOthersInsertInsertFormErrorMessage");
	}
	
});
